import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenuToggle,
} from '@nextui-org/navbar'
import {BrandSection} from '@/components/BrandSection'
import {SocialLinks} from '@/components/SocialLinks'
import {AuthButtons} from '@/components/AuthButtons'
import {MobileNav} from '@/components/MobileNav'


export function Navigation() {
    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <BrandSection/>

            <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
                <SocialLinks/>
                <AuthButtons/>
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <NavbarMenuToggle/>
            </NavbarContent>

            <MobileNav/>
        </NextUINavbar>
    )
}
