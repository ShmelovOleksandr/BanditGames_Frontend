import { useNavigate } from 'react-router-dom'
import DashboardSidebar from '@/components/DashboardSidebar'
import UserHeader from '@/components/UserHeader'
import { getMenuItems } from '@/components/getMenuItems.tsx'
import { Card, CardBody } from '@nextui-org/react'
import { faker } from '@faker-js/faker'
import { ReactNode, useContext } from 'react'
import SecurityContext from '@/context/SecurityContext'

interface UserDashboardLayoutProps {
    userName?: string;
    children: ReactNode;
}

export default function UserDashboardLayout({ userName, children }: UserDashboardLayoutProps) {
    const navigate = useNavigate()
    const { logout } = useContext(SecurityContext)
    const menuItems = getMenuItems(navigate, logout)

    const userPhoto = faker.image.avatar()
    const coverPhoto = faker.image.urlPicsumPhotos({ width: 1200, height: 400 })

    return (
        <div className="min-h-screen bg-secondary-900 text-gray-800">
            <UserHeader coverPhoto={coverPhoto} userPhoto={userPhoto} userName={userName || 'User'} />

            <div className="flex mt-16">
                <DashboardSidebar menuItems={menuItems} onGoBack={() => navigate('/')} />

                <div className="flex-1 p-8">
                    <Card className="mb-6 shadow-lg">
                        <CardBody>
                            {/* Conditional Rendering */}
                            {userName && (
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Welcome {userName}!
                                </h1>
                            )}
                            {children}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}
