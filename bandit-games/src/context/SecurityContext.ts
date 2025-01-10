import { createContext } from 'react'
import Keycloak from "keycloak-js";

export interface ISecurityContext {
    isAuthenticated: () => boolean; // Function that returns a boolean
    loggedInUser: string | undefined;
    userInfo: string | undefined;
    login: () => void;
    logout: () => void;
    hasRoles: (roles: string[]) => boolean;
    keycloak: Keycloak | undefined;

}

const SecurityContext = createContext<ISecurityContext>({
    isAuthenticated: () => false, // Default to always return false
    loggedInUser: undefined,
    userInfo: undefined,
    login: () => {},
    logout: () => {},
    hasRoles: () => false,
    keycloak: undefined,
})

export default SecurityContext
