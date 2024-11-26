import { ReactNode, useContext } from 'react'
import SecurityContext from '@/context/SecurityContext.ts'
import { Navigate } from 'react-router-dom'

export interface RouteGuardProps {
    children: ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
    const {isAuthenticated, login} = useContext(SecurityContext)

    if (isAuthenticated()) {
        return <>{children}</> // Render protected content
    } else {
        login() // Trigger Keycloak login
        return <Navigate to="/" replace /> // Redirect to home (fallback)
    }
}