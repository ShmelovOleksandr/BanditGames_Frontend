import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import SecurityContext from '@/context/SecurityContext'

const MyAccount: React.FC = () => {
    const { userInfo, logout } = useContext(SecurityContext)
    const navigate = useNavigate()

    const menuItems = [
        { title: 'Personal Information', icon: '👤', action: () => navigate('/personal-info') },
        { title: 'Change Password', icon: '🔒', action: () => navigate('/change-password') },
        { title: 'Logout', icon: '🚪', action: logout },
    ]

    return (
        <div className="flex h-screen bg-purple-1000 text-white">
            {/* Sidebar */}
            <aside className="w-1/6 bg-purple-900 shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-8">Dashboard</h2>
                <nav className="flex flex-col gap-4">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={item.action}
                            className="flex items-center gap-2 text-white font-medium hover:text-blue-300"
                        >
                            <span>{item.icon}</span> {item.title}
                        </button>
                    ))}

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-white font-medium hover:text-blue-300"
                    >
                        <span>🔙</span> Go Back
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">
                        Welcome back, {userInfo?.given_name || 'User'}!
                    </h1>
                </div>

                {/* Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={item.action}
                            className="flex flex-col items-center justify-center p-8 bg-purple-700 shadow-md rounded-lg hover:bg-purple-600 cursor-pointer transition"
                        >
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h2 className="text-lg font-semibold">{item.title}</h2>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default MyAccount