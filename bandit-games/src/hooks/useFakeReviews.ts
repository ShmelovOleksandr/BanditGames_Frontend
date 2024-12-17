import {useState, useEffect} from 'react'
import {faker} from '@faker-js/faker'

interface Review {
    quote: string;
    name: string;
    title: string;
}

export function useFakeReviews(intervalMs: number = 5000, total: number = 7) {
    const generateFakeFeedback = (): Review[] =>
        Array.from({length: total}, () => ({
            quote: faker.lorem.sentence(),
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            title: faker.name.jobTitle(),
        }))

    const [reviews] = useState<Review[]>(generateFakeFeedback())
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
        }, intervalMs)
        return () => clearInterval(interval)
    }, [reviews.length, intervalMs])

    const nextReview = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
    const prevReview = () =>
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1))

    return {
        currentReview: reviews[currentIndex],
        nextReview,
        prevReview,
    }
}
