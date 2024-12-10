import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/20/solid'
import {faker} from '@faker-js/faker'
import {useState, useEffect} from 'react'

const ReviewsSection: React.FC = () => {
    const generateFakeFeedback = () =>
        Array.from({length: 7}, () => ({
            quote: faker.lorem.sentence(),
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            title: faker.name.jobTitle(),
        }))

    const reviews = generateFakeFeedback()
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [reviews.length])

    const handleNextReview = () =>
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)

    const handlePreviousReview = () =>
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        )

    const currentReview = reviews[currentIndex]

    return (
        <div className="relative bg-cover bg-center py-20 px-8" style={{backgroundImage: 'url(/splash-bg.jpg)'}}>
            <div
                className="absolute inset-0 bg-gradient-to-r from-purple-900 via-purple-800 to-transparent opacity-90"></div>

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
                <h2 className="text-3xl font-bold text-white">Reviews</h2>

                <div className="relative bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg">
                    <p className="text-lg italic text-white">&quot;{currentReview.quote}&quot;</p>
                    <p className="mt-4 text-white font-semibold">
                        — {currentReview.name}, {currentReview.title}
                    </p>
                </div>

                {/* Arrows */}
                <div className="flex items-center justify-center space-x-4 mt-4">
                    <button
                        className="p-3 bg-purple-950 rounded-full hover:bg-purple-700 transition-transform transform hover:scale-110"
                        onClick={handlePreviousReview}
                    >
                        <ArrowLeftIcon className="h-6 w-6 text-white"/>
                    </button>
                    <button
                        className="p-3 bg-white rounded-full hover:bg-gray-100 transition-transform transform hover:scale-110"
                        onClick={handleNextReview}
                    >
                        <ArrowRightIcon className="h-6 w-6 text-purple-950"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReviewsSection
