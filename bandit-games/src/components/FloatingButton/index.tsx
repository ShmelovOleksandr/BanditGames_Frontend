import {motion} from 'framer-motion'
import {Button} from '@nextui-org/button'

interface FloatingButtonProps {
    onPress: () => void;
}

export default function FloatingButton({
                                           onPress,
                                       }: FloatingButtonProps) {
    return (
        <motion.div
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.3}}
            className={'fixed bottom-5 right-5'}
        >
            <Button
                auto
                shadow
                color="primary"
                onPress={onPress}
                className="bg-blue-600 hover:bg-blue-700"
            >
                Chat
            </Button>
        </motion.div>
    )
}
