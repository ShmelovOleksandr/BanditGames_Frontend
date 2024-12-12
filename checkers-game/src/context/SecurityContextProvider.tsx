import {ReactNode, useEffect, useState} from 'react'
import keycloak from '@/context/keycloakInstance.ts'
import SecurityContext from '@/context/SecurityContext.ts'
import {addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader} from '@/services/auth.ts'

interface IWithChildren {
    children: ReactNode;
}

export default function SecurityContextProvider({children}: IWithChildren) {
    const [authState, setAuthState] = useState(keycloak.authenticated || false)
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        keycloak.init({onLoad: 'check-sso'})
            .then(async (authenticated) => {
                if (authenticated) {
                    addAccessTokenToAuthHeader(keycloak.token)
                    setLoggedInUser(keycloak.idTokenParsed?.given_name)
                    await fetchUserInfo(keycloak.token)
                    // Removed sendTokenToBackend call since it's no longer needed
                    setAuthState(true)
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

    const fetchUserInfo = async (token?: string) => {
        if (!token) return
        const userInfoEndpoint = `${import.meta.env.VITE_KC_URL}/realms/${import.meta.env.VITE_KC_REALM}/protocol/openid-connect/userinfo`

        try {
            const response = await fetch(userInfoEndpoint, {
                headers: {Authorization: `Bearer ${token}`},
            })
            if (response.ok) {
                const data = await response.json()
                setUserInfo(data)
            } else {
                console.error('Failed to fetch user info')
            }
        } catch (error) {
            console.error('Error fetching user info:', error)
        }
    }

    keycloak.onAuthSuccess = async () => {
        addAccessTokenToAuthHeader(keycloak.token)
        setLoggedInUser(keycloak.idTokenParsed?.given_name)
        await fetchUserInfo(keycloak.token)
    }

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader()
        setUserInfo(null)
        setAuthState(false)
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
    const logout = () => keycloak.logout({redirectUri: import.meta.env.VITE_REACT_APP_URL})

    if (!isInitialized) return <div>Loading...</div>

    return (
        <SecurityContext.Provider value={{isAuthenticated: authState, loggedInUser, userInfo, login, logout, keycloak}}>
            {children}
        </SecurityContext.Provider>
    )
}
