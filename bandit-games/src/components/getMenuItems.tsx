import {NavigateFunction} from 'react-router-dom'
import {siteConfig} from '@/config/site'
import {
    UserIcon,
    LockClosedIcon,
    FolderIcon,
    BookOpenIcon,
    ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/solid'

const IconWrapper = ({children}: { children: React.ReactNode }) => (
    <div className="w-6 h-6 text-gray-500">{children}</div>
)

export function getMenuItems(navigate: NavigateFunction, logout: () => void) {
    return [
        {
            title: 'My Account',
            icon: <IconWrapper><FolderIcon/></IconWrapper>,
            action: () => navigate('/my-account'),
        },
        {
            title: 'Personal Information',
            icon: <IconWrapper><UserIcon/></IconWrapper>,
            action: () => navigate('/personal-info'),
        },
        {
            title: 'Change Password',
            icon: <IconWrapper><LockClosedIcon/></IconWrapper>,
            action: () => navigate('/change-password'),
        },
        {
            title: 'Game Library',
            icon: <IconWrapper><BookOpenIcon/></IconWrapper>,
            action: () => navigate(siteConfig.links.library),
        },
        {
            title: 'Friends',
            icon: <IconWrapper><UserIcon/></IconWrapper>,
            action: () => navigate('/friends'),
        },
        {
            title: 'Logout',
            icon: <IconWrapper><ArrowLeftOnRectangleIcon/></IconWrapper>,
            action: logout,
        },
    ]
}
