import { NavigateFunction } from 'react-router-dom'
import { siteConfig } from '@/config/site'

export function getMenuItems(navigate: NavigateFunction, logout: () => void) {
    return [
        {
            title: 'Personal Information',
            icon: '👤',
            action: () => navigate('/personal-info'),
        },
        {
            title: 'Change Password',
            icon: '🔒',
            action: () => navigate('/change-password'),
        },
        {
            title: 'My Account',
            icon: '📂',
            action: () =>
                navigate(
                    siteConfig.navItems.find((item) => item.label === 'My Account')?.href || '/'
                ),
        },
        {
            title: 'Game Library',
            icon: '🎮',
            action: () => navigate(siteConfig.links.library),
        },
        {
            title: 'Logout',
            icon: '🚪',
            action: logout,
        },
    ]
}
