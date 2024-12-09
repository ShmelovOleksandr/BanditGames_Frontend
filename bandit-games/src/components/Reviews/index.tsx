import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import { faker } from '@faker-js/faker'
import { useState } from 'react'

const ReviewsSection: React.FC = () => {
    // Generate an array of 7 fake reviews
    const generateFakeFeedback = () =>
        Array.from({ length: 7 }, () => ({
            quote: faker.lorem.sentence(),
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            title: faker.name.jobTitle(),
        }))

    const reviews = generateFakeFeedback()

    const [currentIndex, setCurrentIndex] = useState(0)

    const handleNextReview = () =>
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)

    const handlePreviousReview = () =>
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        )

    const currentReview = reviews[currentIndex]

    return (
        <div className="px-12 py-8 h-48 mb-14 flex justify-center items-center">
            <div className="flex flex-col">
                <h3 className="flex justify-center text-xl font-bold text-center mb-4">Reviews</h3>
                <div className="flex items-center justify-center space-x-4">
                    {/* Left Arrow */}
                    <button
                        className="p-2 bg-purple-950 rounded-full hover:bg-purple-700"
                        onClick={handlePreviousReview}
                    >
                        <ArrowLeftIcon className="h-5 w-5 text-white" />
                    </button>

                    {/* Review Content */}
                    <div className="max-w-xl text-center">
                        <p className="text-gray-300 italic">&quot;{currentReview.quote}&quot;</p>
                        <p className="mt-2 text-white font-semibold">{`— ${currentReview.name}, ${currentReview.title}`}</p>
                    </div>

                    {/* Right Arrow */}
                    <button
                        className="p-2 bg-white rounded-full hover:bg-gray-100"
                        onClick={handleNextReview}
                    >
                        <ArrowRightIcon className="h-5 w-5 text-purple-950" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReviewsSection
