import { NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { Logo } from '@/components/icons'
import clsx from 'clsx'

export function BrandSection() {
    return (
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
            <NavbarBrand className="gap-3 max-w-fit">
                <Link to="/" className="flex justify-start items-center gap-1">
                    <Logo color="#310150" />
                    <p className="font-bold bg-gradient-to-r from-secondary-200 via-secondary-500 to-secondary-600 text-transparent bg-clip-text">
                        BANDIT GAMES
                    </p>
                </Link>
            </NavbarBrand>
            <div className="hidden lg:flex gap-4 justify-start ml-2">
                {siteConfig.navItems.map((item) => (
                    <NavbarItem key={item.href}>
                        <Link
                            to={`/${item.href}`}
                            className={clsx(
                                'text-default-600 hover:text-primary',
                                'data-[active=true]:text-primary data-[active=true]:font-medium'
                            )}
                        >
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </div>
        </NavbarContent>
    )
}
