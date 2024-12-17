import {useContext} from 'react'
import SecurityContext from '@/context/SecurityContext'
import {useUserAttributes} from '@/hooks/useUserAttributes'
import {Button} from '@nextui-org/button'
import AccountLayout from '@/layouts/account'
import UserFormField from '@/components/UserFormField'

export default function UserInfo() {
    const {userInfo, isAuthenticated, login, keycloak} = useContext(SecurityContext)
    const {attributes, setAttributes, isLoading, handleSave, navigate} = useUserAttributes(
        userInfo,
        keycloak,
        isAuthenticated,
        login
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setAttributes((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center text-gray-300 text-lg">
                Loading...
            </div>
        )
    }

    const fields = [
        {label: 'Username', name: 'username', type: 'text'},
        {label: 'Email Address', name: 'email', type: 'email'},
        {label: 'First Name', name: 'firstName', type: 'text'},
        {label: 'Last Name', name: 'lastName', type: 'text'},
        {label: 'Age', name: 'age', type: 'number'},
    ]

    return (
        <AccountLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => (
                    <UserFormField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        value={attributes[field.name as keyof typeof attributes] as string}
                        onChange={handleInputChange}
                    />
                ))}
            </div>

            <div className="flex justify-between mt-8">
                <Button
                    color="secondary"
                    variant="flat"
                    onClick={() => navigate('/my-account')}
                    className="hover:bg-gray-200 transition duration-300"
                >
                    Go Back
                </Button>
                <Button
                    color="primary"
                    onClick={handleSave}
                    className="hover:bg-blue-600 transition duration-300"
                >
                    Save Changes
                </Button>
            </div>
        </AccountLayout>
    )
}
