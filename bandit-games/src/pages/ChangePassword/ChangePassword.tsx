import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import SecurityContext from '@/context/SecurityContext'

const ChangePassword: React.FC = () => {
    const { isAuthenticated, login, userInfo } = useContext(SecurityContext)
    const navigate = useNavigate()

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handlePasswordChange = async () => {
        setError('')
        setSuccess('')
        if (!isAuthenticated) {
            login()
            return
        }

        if (newPassword !== confirmPassword) {
            setError('New password and confirmation do not match.')
            return
        }

        try {
            setIsLoading(true)

            // Fetch admin token
            const adminTokenResponse = await fetch(`${import.meta.env.VITE_KC_URL}/realms/master/protocol/openid-connect/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    client_id: import.meta.env.VITE_KC_ADMIN_CLIENT_ID,
                    client_secret: import.meta.env.VITE_KC_ADMIN_CLIENT_SECRET,
                    grant_type: 'client_credentials',
                }),
            })

            if (!adminTokenResponse.ok) {
                throw new Error(`Failed to fetch admin token: ${adminTokenResponse.statusText}`)
            }

            const adminTokenData = await adminTokenResponse.json()
            const adminToken = adminTokenData.access_token

            // Update user password in Keycloak
            const userId = userInfo?.sub // Assuming 'sub' contains the user's ID
            const response = await fetch(`${import.meta.env.VITE_KC_URL}/admin/realms/${import.meta.env.VITE_KC_REALM}/users/${userId}/reset-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken}`,
                },
                body: JSON.stringify({
                    type: 'password',
                    value: newPassword,
                    temporary: false,
                }),
            })

            if (!response.ok) {
                throw new Error(`Failed to update password: ${response.statusText}`)
            }

            setSuccess('Your password has been successfully changed.')
        } catch (error) {
            console.error('Error changing password:', error)
            setError('Failed to change password. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-purple-950 text-white py-12">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Change Password</h1>
                </div>

                <div className="bg-purple-800 shadow-lg rounded-lg p-8">
                    <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Update Your Password</h2>
                    <div className="grid gap-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="currentPassword">
                                Current Password
                            </label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="block w-full bg-purple-300 text-black border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter current password"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="newPassword">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="block w-full bg-purple-300 text-black border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter new password"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="confirmPassword">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full bg-purple-300 text-black border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Confirm new password"
                            />
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-sm font-medium mt-4">{error}</div>}
                    {success && <div className="text-green-500 text-sm font-medium mt-4">{success}</div>}

                    <div className="flex justify-between mt-10">
                        <button
                            type="button"
                            onClick={handlePasswordChange}
                            className={`px-5 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-300 ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Changing...' : 'Change Password'}
                        </button>
                        <button
                            onClick={() => navigate('/my-account')}
                            className="px-5 py-3 bg-purple-950 text-white font-medium rounded-lg hover:bg-purple-600"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
