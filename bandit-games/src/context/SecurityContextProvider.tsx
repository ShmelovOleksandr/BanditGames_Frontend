import { ReactNode, useEffect, useState } from 'react'
import SecurityContext from './SecurityContext'
import { addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader } from '@/services/auth'
import {isExpired} from 'react-jwt'
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
    const [setIsAuthenticated] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined)
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
            keycloak
                .init({ onLoad: 'check-sso' })
                .then((authenticated) => {
                    if (authenticated) {
                        addAccessTokenToAuthHeader(keycloak.token)
                        setLoggedInUser(keycloak.idTokenParsed?.given_name)
                        setIsAuthenticated(true)
                    }
                    setIsInitialized(true)
                })
                .catch((error) => {
                    console.error('Keycloak initialization failed:', error)
                    setIsInitialized(true) // Avoid infinite loading
                })
    }, [])

    keycloak.onAuthSuccess = () => {
        addAccessTokenToAuthHeader(keycloak.token)
        setLoggedInUser(keycloak.idTokenParsed?.given_name)
    }

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader()
    }

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(() => {
            addAccessTokenToAuthHeader(keycloak.token)
            setLoggedInUser(keycloak.idTokenParsed?.given_name)
        })
    }

    const login = () => keycloak.login()
    const logout = () => keycloak.logout({ redirectUri: import.meta.env.VITE_REACT_APP_URL })

    function isAuthenticated() {
        if (keycloak.token) return !isExpired(keycloak.token)
        else return false
    }

    if (!isInitialized) {
        return <div>Loading...</div> // Placeholder during initialization
    }

    return (
        <SecurityContext.Provider
            value={{
                isAuthenticated,
                loggedInUser,
                login,
                logout,
            }}
        >
            {children}
        </SecurityContext.Provider>
    )
}
