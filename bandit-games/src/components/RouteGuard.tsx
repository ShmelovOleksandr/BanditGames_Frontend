import {ReactNode, useContext} from 'react'
import SecurityContext from '../context/SecurityContext.ts'

export interface RouteGuardProps {
    children: ReactNode
}

export function RouteGuard({children}: RouteGuardProps) {
        const {isAuthenticated, login} = useContext(SecurityContext)

    if (isAuthenticated()) {
        return children
    } else { // fallback, the security context will already redirect to KC...
        return <button onClick={login}>Login</button>
    }
}
