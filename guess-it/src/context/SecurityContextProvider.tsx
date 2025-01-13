import {ReactNode, useEffect, useState} from 'react'
import keycloak from "@/context/keycloakInstance.ts";
import {addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader} from "@/services/auth.ts";
import SecurityContext from "@/context/SecurityContext.ts";



interface IWithChildren {
    children: ReactNode;
}

export default function SecurityContextProvider({children}: IWithChildren) {
    const [authState, setAuthState] = useState(keycloak.authenticated || false)
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined)
    const [userId, setUserId] = useState<string | undefined>(undefined)
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        keycloak.init({onLoad: 'check-sso'})
            .then(async (authenticated) => {
                if (authenticated) {
                    addAccessTokenToAuthHeader(keycloak.token)
                    setLoggedInUser(keycloak.idTokenParsed?.given_name)
                    setUserId(keycloak.tokenParsed?.sub)
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

    keycloak.onAuthSuccess = async () => {
        addAccessTokenToAuthHeader(keycloak.token)
        setLoggedInUser(keycloak.idTokenParsed?.given_name)
        setUserId(keycloak.tokenParsed?.sub)
    }

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader()
        setUserId(undefined)
        setLoggedInUser(undefined)
        setAuthState(false)
    }

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(async () => {
            addAccessTokenToAuthHeader(keycloak.token)
        }).catch(() => {
            console.log('Token refresh failed. Logging out.')
            keycloak.logout()
        })
    }

    const login = () => keycloak.login()
    const logout = () => keycloak.logout({redirectUri: import.meta.env.VITE_REACT_APP_URL})

    if (!isInitialized) return <div>Loading...</div>

    return (
        <SecurityContext.Provider value={{isAuthenticated: () => authState, loggedInUser, login, logout, keycloak, userId}}>
            {children}
        </SecurityContext.Provider>
    )
}
