import {ReactNode, useEffect, useState} from 'react'
import SecurityContext from './SecurityContext'
import {addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader} from '@/services/auth'
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

export const initializeKeycloak = (onInitCompleteCallback) => {
    keycloak
        .init({
            onLoad: 'login-required',
            checkLoginIframe: false,
            enableLogging: true,
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
            enableAutomaticRefresh: true,
        })
        .then((authenticated) => {
            if (authenticated) {
                addAccessTokenToAuthHeader(keycloak.token)
                onInitCompleteCallback(keycloak)
            } else {
                console.log('User is not authenticated')
                onInitCompleteCallback(null)
            }
        })
        .catch((error) => {
            console.error('Keycloak initialization failed:', error)
            onInitCompleteCallback(null)
        })
    return keycloak
}

export const logoutKeycloak = () => {
    if (keycloak) {
        keycloak.logout({redirectUri: import.meta.env.VITE_REACT_APP_URL})
    }
}

export default function SecurityContextProvider({children}: IWithChildren) {
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined)
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        initializeKeycloak((authenticatedKeycloak) => {
            if (authenticatedKeycloak) {
                setLoggedInUser(authenticatedKeycloak.tokenParsed?.preferred_username)
            } else {
                setLoggedInUser(undefined)
            }
            setIsInitialized(true)
        })

        keycloak.onAuthSuccess = () => {
            addAccessTokenToAuthHeader(keycloak.token)
            setLoggedInUser(keycloak.tokenParsed?.preferred_username)
        }

        keycloak.onAuthLogout = () => {
            removeAccessTokenFromAuthHeader()
            setLoggedInUser(undefined)
        }

        keycloak.onTokenExpired = () => {
            keycloak.updateToken(-1).then(() => {
                addAccessTokenToAuthHeader(keycloak.token)
                setLoggedInUser(keycloak.tokenParsed?.preferred_username)
            })
        }
    }, [])

    const login = () => keycloak.login()
    const logout = () => logoutKeycloak()

    const isUserAuthenticated = () => {
        return keycloak.authenticated
    }

    if (!isInitialized) {
        return <div>Loading...</div>
    }

    return (
        <SecurityContext.Provider
            value={{
                isAuthenticated: isUserAuthenticated,
                loggedInUser,
                login,
                logout,
                isInitialized,
            }}
        >
            {children}
        </SecurityContext.Provider>
    )
}
