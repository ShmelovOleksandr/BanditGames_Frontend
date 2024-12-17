import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

interface UserAttributes {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number | '';
    gender: string;
    country: string;
    city: string;
    address: string;
    postalCode: string;
}

export function useUserAttributes(userInfo: any, keycloak: any, isAuthenticated: boolean, login: () => void) {
    const navigate = useNavigate()
    const [attributes, setAttributes] = useState<UserAttributes>({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        country: '',
        city: '',
        address: '',
        postalCode: '',
    })

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!isAuthenticated) {
            login()
            return
        }

        if (userInfo) {
            setAttributes({
                username: userInfo.preferred_username || '',
                email: userInfo.email || '',
                firstName: userInfo.given_name || '',
                lastName: userInfo.family_name || '',
                age: userInfo.age || '',
                gender: userInfo.gender || '',
                country: userInfo.country || '',
                city: userInfo.city || '',
                address: userInfo.address || '',
                postalCode: userInfo.postalCode || '',
            })
        }

        setIsLoading(false)
    }, [isAuthenticated, login, userInfo])

    const handleSave = async () => {
        try {
            console.log('Updating token...')
            await keycloak.updateToken(30)
            const userToken = keycloak.token

            console.log('Token:', userToken)
            console.log('Realm:', keycloak.realm)
            console.log('User ID:', userInfo?.sub)

            const payload = {
                username: attributes.username,
                email: attributes.email,
                firstName: attributes.firstName,
                lastName: attributes.lastName,
                attributes: {
                    age: attributes.age ? [String(attributes.age)] : undefined,
                    gender: attributes.gender ? [attributes.gender] : undefined,
                    country: attributes.country ? [attributes.country] : undefined,
                    city: attributes.city ? [attributes.city] : undefined,
                    address: attributes.address ? [attributes.address] : undefined,
                    postalCode: attributes.postalCode ? [attributes.postalCode] : undefined,
                },
            }

            const userId = userInfo?.sub
            if (!userId) throw new Error('User ID not found.')

            const url = `${import.meta.env.VITE_KC_URL}/admin/realms/${keycloak.realm}/users/${userId}`
            console.log('PUT URL:', url)
            console.log('Payload:', JSON.stringify(payload))

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) throw new Error(`Failed to update user: ${response.status} ${response.statusText}`)

            alert('Your changes have been saved.')
        } catch (error) {
            console.error('Error saving user data:', error)
            alert('Failed to save changes. Check console for details.')
        }
    }


    return {attributes, setAttributes, isLoading, handleSave, navigate}
}
