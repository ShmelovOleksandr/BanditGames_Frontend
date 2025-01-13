import { createContext } from 'react'
import Keycloak from "keycloak-js";

export interface ISecurityContext {
    isAuthenticated: () => boolean; // Function that returns a boolean
    loggedInUser: string | undefined;
    userId: string | undefined;
    keycloak: Keycloak | undefined;
    login: () => void;
    logout: () => void;
}

const SecurityContext = createContext<ISecurityContext>({
    isAuthenticated: () => false, // Default to always return false
    loggedInUser: undefined,
    userId: undefined,
    keycloak: undefined,
    login: () => {},
    logout: () => {},
})

export default SecurityContext
