import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from '@nextui-org/navbar'
import Button from '@/components/Button/index.tsx'
import {Link} from 'react-router-dom'
import SearchInput from '@/components/Search'
import {link as linkStyles} from '@nextui-org/theme'
import clsx from 'clsx'

import {siteConfig} from '@/config/site'
import {
    TwitterIcon,
    GithubIcon,
    DiscordIcon,
    Logo,
} from '@/components/icons.tsx'

export const Navigation = () => {

    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand className="gap-3 max-w-fit">
                    <Link to="/" className="flex justify-start items-center gap-1" href="/">
                        <Logo color="#310150"/>
                        <p className="font-bold bg-gradient-to-r from-secondary-200 via-secondary-500 to-secondary-600 text-transparent bg-clip-text">BANDIT
                            GAMES</p>
                    </Link>
                </NavbarBrand>
                <div className="hidden lg:flex gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <Link to={`/${item.href}`}
                                  className={clsx(
                                      linkStyles({color: 'foreground'}),
                                      'data-[active=true]:text-primary data-[active=true]:font-medium',
                                  )}
                                  color="foreground"
                                  href={item.href}
                            >
                                {item.label}
                            </Link>
                        </NavbarItem>
                    ))}
                </div>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden sm:flex gap-2">
                    <Link isExternal to={siteConfig.links.twitter} title="Twitter">
                        <TwitterIcon className="text-default-500"/>
                    </Link>
                    <Link isExternal to={siteConfig.links.instagram} title="Instagram">
                        <DiscordIcon className="text-default-500"/>
                    </Link>
                    <Link isExternal to={siteConfig.links.github} title="GitHub">
                        <GithubIcon className="text-default-500"/>
                    </Link>
                </NavbarItem>
                <NavbarItem className="hidden lg:flex">
                </NavbarItem>
                <NavbarItem className="hidden md:flex">
                    <Button link={siteConfig.links.login} text="Log In"/>
                </NavbarItem>
            </NavbarContent>


            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <Link isExternal to={siteConfig.links.github}>
                    <GithubIcon className="text-default-500"/>
                </Link>
                <NavbarMenuToggle/>
            </NavbarContent>

            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link to={'/' + `${item}`}
                                  color={
                                      index === 2
                                          ? 'primary'
                                          : index === siteConfig.navItems.length - 1
                                              ? 'danger'
                                              : 'foreground'
                                  }
                                  href="#"
                                  size="lg"
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    )
}