import {Button} from '@nextui-org/button'

interface DashboardSidebarProps {
    menuItems: { title: string; icon: string; action: () => void }[];
    onGoBack: () => void;
}

export default function DashboardSidebar({menuItems, onGoBack}: DashboardSidebarProps) {
    return (
        <aside className="w-1/4 bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Dashboard</h2>
            <nav className="space-y-4">
                {menuItems.map((item, index) => (
                    <Button
                        variant={'light'}
                        key={index}
                        onClick={item.action}
                        className="flex items-center gap-3 text-gray-700 font-medium"
                    >
                        <span className="text-xl">{item.icon}</span>
                        {item.title}
                    </Button>
                ))}
            </nav>
        </aside>

    )
}
