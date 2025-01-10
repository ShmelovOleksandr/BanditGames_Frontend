import {ReactNode, useContext, useEffect, useState} from "react";
import SecurityContext from "@/context/SecurityContext.ts";
import {Navigate} from "react-router-dom";

interface RoleBasedRouteGuardProps {
    children: ReactNode;
    requiredRoles: string[];
}

export function RoleBasedRouteGuard({ children, requiredRoles }: RoleBasedRouteGuardProps) {
    const { isAuthenticated, login, hasRoles } = useContext(SecurityContext)
    const [isCheckingAuth, setIsCheckingAuth] = useState(true) // To handle async login flow

    useEffect(() => {
        if (!isAuthenticated) {
            login()
        } else {
            setIsCheckingAuth(false)
        }
    }, [isAuthenticated, login])

    if (isCheckingAuth) {
        return <div>Loading...</div> // Show a loading indicator while checking authentication
    }

    return isAuthenticated && hasRoles(requiredRoles) ? <>{children}</> : <Navigate to="/" replace /> // Redirect to home if not authenticated
}
