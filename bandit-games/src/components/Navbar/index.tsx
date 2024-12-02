import {
    Navbar as NextUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from '@nextui-org/navbar'
import {Link} from 'react-router-dom'
import clsx from 'clsx'

import {siteConfig} from '@/config/site'
import {useContext} from 'react'
import SecurityContext from '@/context/SecurityContext'
import {
    TwitterIcon,
    GithubIcon,
    DiscordIcon,
    Logo,
} from '@/components/icons.tsx'
import {Button} from '@nextui-org/button'

export const Navigation = () => {
    const { isAuthenticated, login, logout, loggedInUser } = useContext(SecurityContext)
    console.log(isAuthenticated)
    console.log(loggedInUser)


    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            {/* Brand Section */}
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand className="gap-3 max-w-fit">
                    <Link to="/" className="flex justify-start items-center gap-1">
                        <Logo color="#310150"/>
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
                                    'data-[active=true]:text-primary data-[active=true]:font-medium',
                                )}
                            >
                                {item.label}
                            </Link>
                        </NavbarItem>
                    ))}
                </div>
            </NavbarContent>

            {/* Social Links and Search */}
            <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem className="hidden sm:flex gap-2">
                    <Link to={siteConfig.links.twitter} target="_blank" title="Twitter">
                        <TwitterIcon className="text-default-500"/>
                    </Link>
                    <Link to={siteConfig.links.instagram} target="_blank" title="Instagram">
                        <DiscordIcon className="text-default-500"/>
                    </Link>
                    <Link to={siteConfig.links.github} target="_blank" title="GitHub">
                        <GithubIcon className="text-default-500"/>
                    </Link>
                </NavbarItem>

                {/* Log In / Log Out Button */}
                <NavbarItem className="hidden lg:flex">
                </NavbarItem>
                <NavbarItem className="hidden md:flex">
                    {!isAuthenticated ? (
                        <a
                            href={siteConfig.links.login}
                            className="px-4 py-2 text-white bg-purple-950 rounded hover:bg-purple-700"
                            onClick={login}
                        >
                            Log In
                        </a>
                    ) : (
                        <Button
                            onClick={logout}
                            className="px-4 py-2 text-white bg-purple-950 rounded hover:bg-purple-700"
                        >
                            Log Out
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>

            {/* Mobile Menu */}
            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <Link to={siteConfig.links.github} target="_blank">
                    <GithubIcon className="text-default-500"/>
                </Link>
                <NavbarMenuToggle/>
            </NavbarContent>

            {/* Mobile Navigation */}
            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link to={`/${item.href}`} className="text-default-600">
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    )
}
