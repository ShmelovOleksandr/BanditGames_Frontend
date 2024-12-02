import { useContext } from 'react'
import SecurityContext from '@/context/SecurityContext'

export const useKeycloak = () => {
    const { isAuthenticated, loggedInUser, login, logout, keycloak } = useContext(SecurityContext)
    return { isAuthenticated, loggedInUser, login, logout, keycloak }
}
