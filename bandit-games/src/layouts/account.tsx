import {ReactNode} from 'react'
import {Navigation} from '@/components/Navbar'

interface AccountLayoutProps {
    leftSidebar: ReactNode;

    mainContent: ReactNode;
    rightSidebar: ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({leftSidebar, mainContent, rightSidebar}) => {
    return (
        <>
            <Navigation/>
            <div className="flex h-screen bg-gray-900 text-white">
                {/* Left Sidebar */}
                <aside className="w-1/4 p-4 bg-gray-800">{leftSidebar}</aside>

                {/* Main Content */}
                <main className="flex-grow p-6">{mainContent}</main>

                {/* Right Sidebar */}
                <aside className="w-1/4 p-4 bg-gray-800">{rightSidebar}</aside>
            </div>
        </>
    )
}

export default AccountLayout
