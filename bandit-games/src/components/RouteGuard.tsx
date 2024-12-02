import {ReactNode, useContext} from 'react'
import SecurityContext from '@/context/SecurityContext'

export interface RouteGuardProps {
    children: ReactNode;
}

export function RouteGuard({children}: RouteGuardProps) {
    const {isAuthenticated, login, isInitialized} = useContext(SecurityContext)

    if (!isInitialized) {
        return <div>Loading...</div>
    }

    if (isAuthenticated()) {
        return <>{children}</>
    } else {
        login()
        return null
    }
}
