import { ReactNode, useEffect, useState } from 'react';
import SecurityContext from './SecurityContext';
import keycloak from './keycloak';
import { addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader } from '../services/auth';

interface IWithChildren {
    children: ReactNode;
}

export default function SecurityContextProvider({ children }: IWithChildren) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isInitialized) {
            keycloak
                .init({ onLoad: 'login-required' })
                .then((authenticated) => {
                    if (authenticated) {
                        addAccessTokenToAuthHeader(keycloak.token);
                        setLoggedInUser(keycloak.idTokenParsed?.given_name);
                        setIsAuthenticated(true);
                    } else {
                        keycloak.login();
                    }
                    setIsInitialized(true);
                })
                .catch((error) => {
                    console.error('Keycloak initialization failed:', error);
                    setIsInitialized(true); // Avoid infinite loading
                });
        }
    }, [isInitialized]);

    keycloak.onAuthSuccess = () => {
        addAccessTokenToAuthHeader(keycloak.token);
        setLoggedInUser(keycloak.idTokenParsed?.given_name);
    };

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader();
        setLoggedInUser(undefined);
        setIsAuthenticated(false);
    };

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(() => {
            addAccessTokenToAuthHeader(keycloak.token);
            setLoggedInUser(keycloak.idTokenParsed?.given_name);
        });
    };

    const login = () => keycloak.login();
    const logout = () => keycloak.logout({ redirectUri: import.meta.env.VITE_REACT_APP_URL });

    if (!isInitialized) {
        return <div>Loading...</div>; // Placeholder during initialization
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
    );
}
