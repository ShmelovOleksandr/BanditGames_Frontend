import { ReactNode, useEffect, useState } from 'react'
import SecurityContext from './SecurityContext'
import { addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader } from '@/services/auth'
import { isExpired } from 'react-jwt'
import Keycloak from 'keycloak-js'

interface IWithChildren {
    children: ReactNode;
}

const keycloakConfig = {
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID,
}

const keycloak: Keycloak = new Keycloak(keycloakConfig)

export default function SecurityContextProvider({ children }: IWithChildren) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined)
    const [userInfo, setUserInfo] = useState<any>(null) // State for storing user info
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        keycloak
            .init({ onLoad: 'check-sso' })
            .then(async (authenticated) => {
                if (authenticated) {
                    addAccessTokenToAuthHeader(keycloak.token)
                    setLoggedInUser(keycloak.idTokenParsed?.given_name)
                    await fetchUserInfo(keycloak.token) // Fetch user info from endpoint
                    setIsAuthenticated(true)
                }
                setIsInitialized(true)
            })
            .catch((error) => {
                console.error('Keycloak initialization failed:', error)
                setIsInitialized(true) // Avoid infinite loading
            })
    }, [])

    const fetchUserInfo = async (token: string | undefined) => {
        if (!token) return

        const userInfoEndpoint = `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/userinfo`

        try {
            const response = await fetch(userInfoEndpoint, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setUserInfo(data) // Store user info in state
                console.log('User Info:', data) // Log for debugging
            } else {
                console.error('Failed to fetch user info:', response.statusText)
            }
        } catch (error) {
            console.error('Error fetching user info:', error)
        }
    }

    keycloak.onAuthSuccess = async () => {
        addAccessTokenToAuthHeader(keycloak.token)
        setLoggedInUser(keycloak.idTokenParsed?.given_name)
        await fetchUserInfo(keycloak.token) // Fetch user info after authentication
    }

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader()
        setUserInfo(null) // Clear user info on logout
    }

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(async () => {
            addAccessTokenToAuthHeader(keycloak.token)
            setLoggedInUser(keycloak.idTokenParsed?.given_name)
            await fetchUserInfo(keycloak.token) // Refresh user info after token update
        })
    }

    const login = () => keycloak.login()
    const logout = () => keycloak.logout({ redirectUri: import.meta.env.VITE_REACT_APP_URL })

    function checkIsAuthenticated() {
        if (keycloak.token) return !isExpired(keycloak.token)
        return false
    }

    if (!isInitialized) {
        return <div>Loading...</div> // Placeholder during initialization
    }

    return (
        <SecurityContext.Provider
            value={{
                isAuthenticated: checkIsAuthenticated,
                loggedInUser,
                userInfo, // Expose userInfo in context
                login,
                logout,
            }}
        >
            {children}
        </SecurityContext.Provider>
    )
}
