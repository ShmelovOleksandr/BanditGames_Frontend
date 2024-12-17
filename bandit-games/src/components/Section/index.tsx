import {motion, useAnimation} from 'framer-motion'
import {useInView} from 'react-intersection-observer'
import {useEffect, ReactNode, CSSProperties} from 'react'

interface SectionComponentProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}

function SectionComponent({children, className, style}: SectionComponentProps) {
    const controls = useAnimation()
    const [ref, inView] = useInView({threshold: 0.2})

    useEffect(() => {
        if (inView) {
            controls.start('visible')
        } else {
            controls.start('hidden')
        }
    }, [controls, inView])

    const variants = {
        hidden: {opacity: 0, y: 50},
        visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    )
}

export default SectionComponent
