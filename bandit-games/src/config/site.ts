export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "NextUI",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Game Library",
            href: "/game-library",
        },
        {
            label: "My Account",
            href: "/my-account",
        },

    ],
    navMenuItems: [
        {
            label: "Profile",
            href: "/profile",
        },
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Projects",
            href: "/projects",
        },
        {
            label: "Team",
            href: "/team",
        },
        {
            label: "Calendar",
            href: "/calendar",
        },
        {
            label: "Settings",
            href: "/settings",
        },
        {
            label: "Help & Feedback",
            href: "/help-feedback",
        },
        {
            label: "Logout",
            href: "/logout",
        },
    ],
    //TODO: change links
    links: {
        github: "https://github.com/nextui-org/nextui",
        twitter: "https://twitter.com/getnextui",
        instagram: "#",
        docs: "https://nextui.org",
        login: "#",
    },
};