import {NavbarMenu, NavbarMenuItem} from '@nextui-org/navbar'
import {Link} from 'react-router-dom'
import {siteConfig} from '@/config/site'
import {AuthButtons} from '@/components/AuthButtons'

export function MobileNav() {
    return (
        <NavbarMenu>
            <div className="mx-4 mt-2 flex flex-col gap-2">
                {siteConfig.navItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.href}-${index}`}>
                        <Link to={`/${item.href}`} className="text-default-600">
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}

                <div className="flex flex-col gap-2 mt-4" style={{visibility: 'visible', display: 'flex'}}>
                    <AuthButtons/>
                </div>
            </div>
        </NavbarMenu>
    )
}
