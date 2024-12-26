import {useEffect, useState} from 'react'
import {faker} from '@faker-js/faker'
import {Card, CardBody, CardHeader} from '@nextui-org/react'

interface Achievement {
    id: number;
    title: string;
    imageUrl: string;
}

export default function AchievementsCarousel() {
    const [achievements, setAchievements] = useState<Achievement[]>([])

    useEffect(() => {
        // Generate fake achievements data
        const fakeAchievements = Array.from({length: 3}, (_, i) => ({
            id: i,
            title: faker.lorem.words(2),
            imageUrl: faker.image.url({width: 400, height: 300, category: 'nature'}),
        }))
        setAchievements(fakeAchievements)
    }, [])

    return (
        <div className="flex justify-center bg-white shadow-lg rounded-lg py-12">
            <div className="w-full max-w-4xl px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {achievements.map((achievement) => (
                        <Card
                            key={achievement.id}
                            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                        >
                            <CardHeader className="p-0">
                                <img
                                    src={achievement.imageUrl}
                                    alt={achievement.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            </CardHeader>
                            <CardBody className="text-center p-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {achievement.title}
                                </h3>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
