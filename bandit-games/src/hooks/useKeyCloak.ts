import { useContext } from 'react'
import SecurityContext from '@/context/SecurityContext'

export const useKeycloak = () => {
    const { isAuthenticated, loggedInUser, login, logout, keycloak, userId } = useContext(SecurityContext)
    return { isAuthenticated, loggedInUser, login, logout, keycloak, userId }
}
