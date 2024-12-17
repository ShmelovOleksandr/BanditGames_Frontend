import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'

interface MessageBubbleProps {
    role: 'user' | 'chat';
    content: string;
}

export default function MessageBubble({role, content}: MessageBubbleProps) {
    const [displayText, setDisplayText] = useState('')

    useEffect(() => {
        if (!content) {
            setDisplayText('Message unavailable')
            return
        }

        if (role === 'user') {
            setDisplayText(content)
        } else if (role === 'chat') {
            let display = ''
            let currentIndex = 0

            const typingInterval = setInterval(() => {
                display += content[currentIndex]
                setDisplayText(display)
                currentIndex++

                if (currentIndex >= content.length) {
                    clearInterval(typingInterval)
                }
            }, 30)

            return () => clearInterval(typingInterval)
        }
    }, [role, content])

    const bubbleClasses =
        role === 'chat'
            ? 'bg-gray-200 text-black self-start'
            : 'bg-blue-500 text-white self-end'

    return (
        <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.2}}
            className={`rounded-lg px-4 py-2 max-w-[70%] whitespace-pre-wrap ${bubbleClasses}`}
        >
            {displayText}
        </motion.div>
    )
}
