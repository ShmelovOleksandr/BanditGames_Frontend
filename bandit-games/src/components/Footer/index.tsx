import {Link} from '@nextui-org/link'
import {siteConfig} from '@/config/site.ts'
import {DiscordIcon, GithubIcon, Logo, TwitterIcon} from '@/components/icons.tsx'

export default function Footer() {
    return (
        <footer className="flex flex-col w-full h-fit bg-secondary-100 text-[#e4d4f4] px-14 py-14">
            <div className="flex flex-row">
                {/* Company Info and Social Links */}
                <div className="flex flex-col gap-2 justify-center w-[35%]">
                    <div className="flex items-center w-full gap-4">
                        <Logo size={55}/>
                        <div
                            className="uppercase leading-tight font-bold bg-gradient-to-r from-secondary-600 via-secondary-500 to-secondary-300 text-transparent bg-clip-text">
                            <span className="block">Bandit</span>
                            <span className="block">Games</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 w-fit p-4">
                        <Link isExternal href={siteConfig.links.twitter} title="Twitter">
                            <TwitterIcon size={40} className="text-default-500"/>
                        </Link>
                        <Link isExternal href={siteConfig.links.instagram} title="Instagram">
                            <DiscordIcon size={40} className="text-default-500"/>
                        </Link>
                        <Link isExternal href={siteConfig.links.github} title="GitHub">
                            <GithubIcon size={40} className="text-default-500"/>
                        </Link>
                    </div>
                </div>

                {/* Footer Links and Newsletter */}
                <div className="flex flex-row w-[65%] justify-end gap-16 text-nowrap">
                    {/* Footer Links */}
                    <div className="flex flex-col gap-2">
                        <div className="font-bold uppercase text-[#9ca3af] pb-3">Company</div>
                        <a href="#xxx" className="hover:underline">About Us</a>
                        <a href="#xxx" className="hover:underline">Contact</a>
                        <a href="#xxx" className="hover:underline">Support</a>
                        <a href="#xxx" className="hover:underline">News</a>
                    </div>

                    {/* Newsletter Section */}
                    <div className="flex flex-col gap-2">
                        <div className="font-bold uppercase text-[#9ca3af] pb-3">Newsletter</div>
                        <p className="text-[#e5e7eb] mb-2">Subscribe to our newsletter.</p>
                        <form className="flex items-center">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full bg-gray-100 text-gray-700 rounded-l-lg py-3 px-4 focus:outline-none focus:ring-purple-600 focus:border-transparent"
                                autoComplete="off"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-secondary-400 text-[#ffffff] font-semibold py-3 px-6 rounded-r-lg transition-colors duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-full border-t border-gray-500 my-8"></div>
            <div className="text-center">© 2024 Bandit Games - All rights reserved.</div>
        </footer>
    )
}
