import { useContext } from 'react'
import SecurityContext from "@/context/SecurityContext.ts";

export const useKeycloak = () => {
    const { isAuthenticated, loggedInUser, login, logout, userId, keycloak} = useContext(SecurityContext)
    return { isAuthenticated, loggedInUser, login, logout, userId, keycloak }
}
