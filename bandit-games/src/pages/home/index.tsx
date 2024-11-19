import {Button} from "@nextui-org/react";
import {subtitle, title} from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {Link} from "@nextui-org/link";
import {siteConfig} from "@/config/site.ts";


export const Home = () => {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 drop-shadow-md"
                     style={{
                         backgroundImage: `url('/splash-bg.jpg')`,
                         backgroundSize: "cover",
                         backgroundPosition: "center",
                     }}>
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title()}> Welcome to BanditGames!</h1>
                </div>
                <div className="text-center justify-center px-3 ">
                    <p className={subtitle()}>
                        Dive into a world of fun and excitement with personalized game
                        recommendations tailored just for you. Track your progress, connect
                        with friends, and enjoy endless gaming possibilities.
                    </p>
                    <Button
                        as={Link}
                        className="text-sm font-normal text-default-600 bg-default-100"
                        href={siteConfig.links.sponsor}
                        variant="flat"
                    >
                        Play
                    </Button>
                </div>
            </section>
        </DefaultLayout>
    );
};

export default Home;
