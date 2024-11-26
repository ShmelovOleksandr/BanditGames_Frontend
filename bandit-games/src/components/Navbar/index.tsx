import {
    Navbar as NextUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from '@nextui-org/navbar'
import {Input} from '@nextui-org/input'
import {Link} from 'react-router-dom'
import {Kbd} from '@nextui-org/kbd'
import clsx from 'clsx'

import {siteConfig} from '@/config/site'
import {DiscordIcon, GithubIcon, Logo, SearchIcon, TwitterIcon,} from '@/components/icons.tsx'
import {useContext} from 'react'
import SecurityContext from '@/context/SecurityContext'

export const Navigation = () => {
    const {isAuthenticated, login, logout, loggedInUser} = useContext(SecurityContext)
    console.log(isAuthenticated)
    console.log(loggedInUser)

    const searchInput = (
        <Input
            aria-label="Search"
            classNames={{
                inputWrapper: 'bg-default-100',
                input: 'text-sm',
            }}
            endContent={
                <Kbd className="hidden lg:inline-block" keys={['ctrl']}>
                    K
                </Kbd>
            }
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0"/>
            }
            type="search"
        />
    )

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
                <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>

                {/* Log In / Log Out Button */}
                <NavbarItem className="hidden md:flex">
                    {!isAuthenticated() ? (
                        <a
                            href={siteConfig.links.login}
                            className="px-4 py-2 text-white bg-purple-950 rounded hover:bg-purple-700"
                            onClick={login}
                        >
                            Log In
                        </a>
                    ) : (
                        <NavbarItem>
                            <button
                                onClick={logout}
                                className="px-4 py-2 text-purple-950 bg-purple-400 rounded hover:bg-purple-700"
                            >
                                Log Out
                            </button>
                        </NavbarItem>
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
                {searchInput}
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

