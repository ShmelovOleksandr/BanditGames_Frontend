import { createContext } from 'react'

export interface ISecurityContext {
    isAuthenticated: () => boolean;
    loggedInUser: string | undefined;
    login: () => void;
    logout: () => void;
    isInitialized: boolean;
}

const SecurityContext = createContext<ISecurityContext>({
    isAuthenticated: () => false,
    loggedInUser: undefined,
    login: () => {},
    logout: () => {},
    isInitialized: false,
})

export default SecurityContext
