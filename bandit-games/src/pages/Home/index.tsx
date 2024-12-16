import {subtitle, title} from '@/components/primitives'
import DefaultLayout from '@/layouts/default'
import {siteConfig} from '@/config/site.ts'
import HomeCard from '@/components/Card'
import User from '@/components/User'
import {generateFakeUsers} from '@/components/fakeUsersGenerator.tsx'
import SectionComponent from '@/components/Section/index.tsx'
import {motion} from 'framer-motion'
import ButtonComponent from '@/components/Button'
import {Button} from '@nextui-org/button'
import {Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from '@nextui-org/react'
import Chat from '@/pages/ChatBot'

export const Home: React.FC = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const fakeUsers = generateFakeUsers(9)

    return (
        <DefaultLayout>
            <SectionComponent
                className="flex flex-col items-center justify-center h-screen gap-4 py-8 md:py-10 drop-shadow-md"
                style={{
                    backgroundImage: 'url(\'/splash-bg.jpg\')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>

                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title({color: 'white'}) + ' text-2xl sm:text-3xl md:text-4xl'}>
                        Welcome to BanditGames!
                    </h1>
                </div>

                <div className="text-center justify-center px-3 ">
                    <p className={subtitle({color: 'neutral'}) + ' text-base sm:text-lg md:text-xl'}>
                        Dive into a world of fun and excitement with personalized game
                        recommendations tailored just for you. Track your progress, connect
                        with friends, and enjoy endless gaming possibilities.
                    </p>
                    <ButtonComponent link={siteConfig.links.library} text="Play"/>
                </div>
            </SectionComponent>

            <SectionComponent
                className="bg-secondary-100 p-4 flex flex-col md:flex-row items-center justify-center gap-8 py-8 md:py-10">
                <div className="flex flex-col items-start gap-4 max-w-lg">
                    <div className={title({color: 'white'})}>
                        Discover Your Next Favorite Game with Tailored Recommendations Just for You
                    </div>
                    <div className={subtitle({color: 'muted'})}>
                        At BanditGames, we understand that every player is unique. Our personalized game
                        recommendations ensure you find the perfect match for your gaming style.
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <HomeCard
                        title="Smart Choices"
                        description="Get suggestions based on your gameplay history and preferences."
                        imageSrc="https://nextui.org/images/hero-card-complete.jpeg"
                    />
                    <HomeCard
                        title="Play More"
                        description="Expand your gaming experience with games that match your interests."
                        imageSrc="https://nextui.org/images/card-example-1.jpeg"
                    />
                </div>
            </SectionComponent>

            <SectionComponent className="flex flex-col items-center justify-center h-screen gap-4 py-8 md:py-10">
                <div className={title({color: 'white'})}>
                    Stay updated with your friends' gaming adventures and your recent plays.
                </div>
                <div className={subtitle({color: 'muted'})}>
                    Discover what your friends are playing and join in on the fun! Keep track of your own gaming
                    journey with ease.
                </div>

                <motion.div
                    whileHover={{scale: 1.2}}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fakeUsers.map((user, index) => (
                        <User
                            key={index}
                            name={user.name}
                            description={`@${user.description}`}
                            avatarSrc={user.avatarSrc}
                        />
                    ))}
                </motion.div>
            </SectionComponent>

            {/* Floating Button to Open Chat Modal */}
            <motion.div
                initial={{opacity: 0, scale: 0.5}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.3}}
                className="fixed bottom-5 right-5"
            >
                <Button
                    auto
                    shadow
                    color="primary"
                    onPress={onOpen}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Chat
                </Button>
            </motion.div>

            {/* Chat Modal */}
            <Modal
                closeButton
                aria-labelledby="chat-modal"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size={'2xl'}
            >
                <ModalContent>
                    <ModalHeader>
                        <h2 className="text-xl font-bold">Chat with our Assistant</h2>
                    </ModalHeader>
                    <ModalBody>
                        <div className="h-96 overflow-y-auto">
                            <Chat/>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </DefaultLayout>
    )
}

export default Home
