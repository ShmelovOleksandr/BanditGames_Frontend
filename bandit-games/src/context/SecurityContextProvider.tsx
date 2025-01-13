import {ReactNode, useEffect, useState} from 'react'
import keycloak from './keycloakInstance'
import SecurityContext from './SecurityContext' // You define your context here
import {addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader} from '../services/auth'

interface IWithChildren {
    children: ReactNode;
}

export default function SecurityContextProvider({children}: IWithChildren) {
    const [authState, setAuthState] = useState(keycloak.authenticated || false)
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [userRoles, setUserRoles] = useState<string[]>([]);
    const [isInitialized, setIsInitialized] = useState(false)
    const [userId, setUserId] = useState<string | undefined>(undefined)

    useEffect(() => {
        keycloak.init({onLoad: 'check-sso'})
            .then(async (authenticated) => {
                if (authenticated) {
                    addAccessTokenToAuthHeader(keycloak.token)
                    setLoggedInUser(keycloak.idTokenParsed?.given_name)
                    setUserRoles(keycloak.realmAccess?.roles || [])
                    setUserId(keycloak.tokenParsed?.sub)
                    await fetchUserInfo(keycloak.token)
                    await sendTokenToBackend(keycloak.token)
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

    const sendTokenToBackend = async (token?: string) => {
        token = keycloak.token
        if (!token) return

        const isRegistered = localStorage.getItem('isRegistered')
        if (isRegistered) return

        try {
            const response = await fetch(`${import.meta.env.VITE_LOCAL_BASE_URL}/api/v1/players`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token}),
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            const data = await response.json()
            console.log('Response from backend:', data)
            localStorage.setItem('isRegistered', 'true')
        } catch (error) {
            console.error('Error sending request:', error)
        }
    }

    keycloak.onAuthSuccess = async () => {
        addAccessTokenToAuthHeader(keycloak.token)
        setLoggedInUser(keycloak.idTokenParsed?.given_name)
        setUserRoles(keycloak.realmAccess?.roles || []);
        setUserId(keycloak.tokenParsed?.sub)
        await fetchUserInfo(keycloak.token)
    }

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader()
        setUserInfo(null)
        setUserRoles([])
        setAuthState(false)
        setUserId(undefined)
    }

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(async () => {
            addAccessTokenToAuthHeader(keycloak.token)
            setUserRoles(keycloak.realmAccess?.roles || []);
            setUserId(keycloak.tokenParsed?.sub)
            await fetchUserInfo(keycloak.token)
        }).catch(() => {
            console.log('Token refresh failed. Logging out.')
            keycloak.logout()
        })
    }
    const hasRoles = (roles: string[]) => {
        return roles.some((role) => userRoles.includes(role));
    };

    const login = () => keycloak.login()
    const logout = () => keycloak.logout({redirectUri: import.meta.env.VITE_REACT_APP_URL})

    if (!isInitialized) return <div>Loading...</div>

    return (
        <SecurityContext.Provider value={{isAuthenticated: authState, loggedInUser, userInfo, userId, login, logout, hasRoles, keycloak}}>
            {children}
        </SecurityContext.Provider>
    )
}
