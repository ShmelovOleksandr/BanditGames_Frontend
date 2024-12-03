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

const keycloak = new Keycloak(keycloakConfig)

export default function SecurityContextProvider({ children }: IWithChildren) {
    const [authState, setAuthState] = useState(() => keycloak.authenticated || false)
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
                    await fetchUserInfo(keycloak.token)
                    setAuthState(true)
                    await sendTokenToBackend(keycloak.token)
                } else {
                    setAuthState(false)
                }
                setIsInitialized(true)
            })
            .catch((error) => {
                console.error('Keycloak initialization failed:', error)
                setIsInitialized(true)
            })
    }, [])

    const sendTokenToBackend = async (token?:string) => {
        token = keycloak.token // Retrieved from Keycloak instance
        if (!token) {
            console.error('No token available')
            return
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_LOCAL_BASE_URL}/api/v1/players`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            const data = await response.json()
            console.log('Response from backend:', data)
        } catch (error) {
            console.error('Error sending request:', error)
        }
    }


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
        setUserInfo(null)
        setAuthState(false) // Update auth state on logout
    }

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(async () => {
            addAccessTokenToAuthHeader(keycloak.token)
            await fetchUserInfo(keycloak.token)
        }).catch(() => {
            console.log('Token refresh failed. Logging out.')
            keycloak.logout()
        })
    }


    const login = () => keycloak.login()
    const logout = () => keycloak.logout({ redirectUri: import.meta.env.VITE_REACT_APP_URL })

    // function checkIsAuthenticated() {
    //     if (keycloak.token) return !isExpired(keycloak.token)
    //     return false
    // }

    if (!isInitialized) {
        return <div>Loading...</div> // Placeholder during initialization
    }

    return (
        <SecurityContext.Provider
            value={{
                isAuthenticated: authState, // Now using the state directly
                loggedInUser,
                userInfo,
                login,
                logout,
                keycloak,
            }}
        >
            {children}
        </SecurityContext.Provider>
    )
}
