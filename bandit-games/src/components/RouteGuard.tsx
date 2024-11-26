import { ReactNode, useContext } from 'react'
import SecurityContext from '@/context/SecurityContext.ts'
import { Navigate } from 'react-router-dom'

export interface RouteGuardProps {
    children: ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
    const {isAuthenticated, login} = useContext(SecurityContext)

    if (isAuthenticated()) {
        return <>{children}</> // Render the protected content
    } else {
        // Redirect to the Keycloak login page
        login()
        return <Navigate to="/" replace /> // Ensure user is redirected to the home page
    }
}
