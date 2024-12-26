import {Link} from 'react-router-dom'
import {TwitterIcon, GithubIcon, DiscordIcon} from '@/components/icons'
import {siteConfig} from '@/config/site'

export function SocialLinks() {
    return (
        <div className="hidden sm:flex gap-2">
            <Link to={siteConfig.links.twitter} target="_blank" title="Twitter">
                <TwitterIcon className="text-default-500"/>
            </Link>
            <Link to={siteConfig.links.instagram} target="_blank" title="Instagram">
                <DiscordIcon className="text-default-500"/>
            </Link>
            <Link to={siteConfig.links.github} target="_blank" title="GitHub">
                <GithubIcon className="text-default-500"/>
            </Link>
        </div>
    )
}
