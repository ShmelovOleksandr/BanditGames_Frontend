export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: 'NextUI',
    navItems: [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: 'Game Library',
            href: '/game-library',
        },
        {
            label: 'My Account',
            href: '/my-account',
        },

    ],
    //TODO: change links
    links: {
        github: 'https://github.com/nextui-org/nextui',
        twitter: 'https://twitter.com/getnextui',
        instagram: '#',
        docs: 'https://nextui.org',
        login: '#',
    },
}