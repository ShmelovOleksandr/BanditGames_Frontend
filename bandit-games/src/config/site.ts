export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: 'NextUI',
    navItems: [
        {
            label: 'Home',
            href: '',
        },
        {
            label: 'Game Library',
            href: 'game-library',
        },
        {
            label: 'My Account',
            href: 'my-account',
        },

    ],
    //TODO: change links
    links: {
        github: 'https://github.com/nextui-org/nextui',
        twitter: 'https://twitter.com/getnextui',
        instagram: '#',
        docs: 'https://nextui.org',
        login: `${import.meta.env.VITE_KC_URL}/realms/${encodeURIComponent(import.meta.env.VITE_KC_REALM)}/protocol/openid-connect/auth?client_id=${encodeURIComponent(import.meta.env.VITE_KC_CLIENT_ID)}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_REACT_APP_URL)}&response_type=code`,
        library: '/game-library'
    },
}