import AchievementsCarousel from '@/components/Achivements'
import UserDashboardLayout from '@/layouts/account.tsx'
import {useContext} from 'react'
import SecurityContext from '@/context/SecurityContext'

export default function MyAccount() {
    const {userInfo} = useContext(SecurityContext)

    return (
        <UserDashboardLayout userName={userInfo?.given_name}>
            <p className="text-gray-600 mb-6">
                Manage your account, view achievements, and customize your experience.
            </p>

            <div className="shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">My Achievements</h2>
                <AchievementsCarousel/>
            </div>
        </UserDashboardLayout>
    )
}
