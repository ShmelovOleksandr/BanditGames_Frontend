import {Button} from "@nextui-org/react";
import {subtitle, title} from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {Link} from "@nextui-org/link";
import {siteConfig} from "@/config/site.ts";
import ReusableCard from "@/components/Card";

export const Home = () => {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center h-screen gap-4 py-8 md:py-10 drop-shadow-md"
                     style={{
                         backgroundImage: `url('/splash-bg.jpg')`,
                         backgroundSize: "cover",
                         backgroundPosition: "center",
                     }}>
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title({color: "white"})}> Welcome to BanditGames!</h1>
                </div>
                <div className="text-center justify-center px-3 ">
                    <p className={subtitle({color: "neutral"})}>
                        Dive into a world of fun and excitement with personalized game
                        recommendations tailored just for you. Track your progress, connect
                        with friends, and enjoy endless gaming possibilities.
                    </p>
                    <Button
                        as={Link}
                        className="text-sm font-normal text-default-600 bg-default-100"
                        href={siteConfig.links.login}
                        variant="flat"
                    >
                        Play
                    </Button>
                </div>
            </section>

            <section
                className="bg-secondary-100 p-4 flex flex-col md:flex-row items-center justify-center gap-8 py-8 md:py-10">
                {/* Left Column: Text Content */}
                <div className="flex flex-col items-start gap-4 max-w-lg">
                    <div className={title({color: "white"})}>
                        Discover Your Next Favorite Game with Tailored Recommendations Just for You
                    </div>
                    <div className={subtitle({color: "muted"})}>
                        At BanditGames, we understand that every player is unique. Our personalized game recommendations
                        ensure you find
                        the perfect match for your gaming style.
                    </div>
                </div>

                {/* Right Column: Cards */}
                <div className="flex flex-col items-center gap-4">
                    <ReusableCard
                        title="Smart Choices"
                        description="Get suggestions based on your gameplay history and preferences."
                        imageSrc="https://nextui.org/images/hero-card-complete.jpeg"
                    />
                    <ReusableCard
                        title="Play More"
                        description="Expand your gaming experience with games that match your interests."
                        imageSrc="https://nextui.org/images/card-example-1.jpeg"
                    />
                </div>
            </section>

        </DefaultLayout>
    );
};

export default Home;
