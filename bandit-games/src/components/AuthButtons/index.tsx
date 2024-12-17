import {Button} from '@nextui-org/button'
import {useContext} from 'react'
import SecurityContext from '@/context/SecurityContext'

export function AuthButtons() {
    const {isAuthenticated, login, logout} = useContext(SecurityContext)

    return (
        <div className="hidden md:flex">
            {!isAuthenticated ? (
                <Button
                    className="px-4 py-2 text-white bg-purple-950 rounded hover:bg-purple-700"
                    onPress={login}
                >
                    Log In
                </Button>
            ) : (
                <Button
                    className="px-4 py-2 text-white bg-purple-950 rounded hover:bg-purple-700"
                    onPress={logout}
                >
                    Log Out
                </Button>
            )}
        </div>
    )
}
