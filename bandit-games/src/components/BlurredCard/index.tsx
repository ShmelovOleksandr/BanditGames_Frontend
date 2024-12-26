import {motion} from 'framer-motion'
import {Button} from '@nextui-org/button'

interface BlurredCardProps {
    title: string;
    subtitle: string;
    features: string[];
    price: string;
    onPlayClick: () => void;
    onBuyClick: () => void;
}

function BlurredCard({
                         title,
                         subtitle,
                         features,
                         price,
                         onPlayClick,
                         onBuyClick,
                     }: BlurredCardProps) {
    return (
        <motion.div
            className="relative p-8 bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl max-w-md"
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{
                duration: 0.8,
                type: 'spring',
                stiffness: 100,
            }}
        >
            <div className="text-center">
                <p className="text-sm text-white uppercase tracking-widest">Adventure</p>
                <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
                <p className="text-white mb-4">{subtitle}</p>
            </div>
            <ul className="space-y-3 mb-6">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                        <span className="bg-purple-800 p-2 rounded-full text-white">✔️</span>
                        <p className="text-white">{feature}</p>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center space-x-4">
                <Button
                    className="px-6 py-2 bg-white text-purple-900 font-bold rounded-lg hover:bg-gray-100"
                    onPress={onPlayClick}
                >
                    Play
                </Button>
                <Button
                    className="px-6 py-2 bg-purple-900 text-white font-bold rounded-lg hover:bg-purple-700"
                    onPress={onBuyClick}
                >
                    Buy - {price}
                </Button>
            </div>
            <motion.div
                className="absolute top-[-20px] left-[-20px] bg-pink-400 w-16 h-16 rounded-full blur-2xl opacity-40"
                animate={{
                    x: [0, 30, -30, 0],
                    y: [0, 15, -15, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: 'easeInOut',
                }}
            ></motion.div>
            <motion.div
                className="absolute bottom-[-20px] right-[-20px] bg-blue-400 w-20 h-20 rounded-full blur-2xl opacity-40"
                animate={{
                    x: [0, -20, 20, 0],
                    y: [0, -15, 15, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: 'easeInOut',
                }}
            ></motion.div>
        </motion.div>
    )
}

export default BlurredCard
