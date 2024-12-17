import {Navigation} from '@/components/Navbar'
import Footer from '@/components/Footer'

interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout({children}: DefaultLayoutProps) {
    return (
        <>
            <Navigation/>
            <div className="relative flex flex-col min-h-screen w-full">
                <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">{children}</main>
                <Footer/>
            </div>
        </>
    )
}
