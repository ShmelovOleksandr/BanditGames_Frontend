import { createContext } from 'react'

export interface ISecurityContext {
    isAuthenticated: () => boolean; // Function that returns a boolean
    loggedInUser: string | undefined;
    login: () => void;
    logout: () => void;
}

const SecurityContext = createContext<ISecurityContext>({
    isAuthenticated: () => false, // Default to always return false
    loggedInUser: undefined,
    login: () => {},
    logout: () => {},
})

export default SecurityContext