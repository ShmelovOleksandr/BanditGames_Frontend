import {ReactNode, useContext, useEffect, useState} from 'react'

import {Navigate} from 'react-router-dom'
import SecurityContext from "@/context/SecurityContext.ts";


export interface RouteGuardProps {
    children: ReactNode;
}

export function RouteGuard({children}: RouteGuardProps) {
    const {isAuthenticated, login} = useContext(SecurityContext)
    const [isCheckingAuth, setIsCheckingAuth] = useState(true) // To handle async login flow

    useEffect(() => {
        if (!isAuthenticated()) {
            login() // Trigger Keycloak login
        } else {
            setIsCheckingAuth(false) // Authentication is confirmed
        }
    }, [isAuthenticated, login])

    if (isCheckingAuth) {
        return <div>Loading...</div> // Show a loading indicator while checking authentication
    }

    return isAuthenticated() ? <>{children}</> : <Navigate to="/" replace/> // Redirect to home if not authenticated
}
