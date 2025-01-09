import {Card, CardBody, CardHeader} from '@nextui-org/react'
import {useAchievements} from "@/hooks/useAchievements.ts";
import {Spinner} from "@/components/Achivements/Spinner.tsx";
import {ErrorMessage} from "@/components/Achivements/ErrorMessage.tsx";

interface Achievement {
    achievementId: string;
    name: string;
    description: string;
    imageUrl: string;
    isAchieved: boolean;
}

export default function AchievementsCarousel() {
    const { data: achievements, isLoading, isError, error } = useAchievements()

    if (isLoading) return <Spinner message="Loading achievements..." />
    if (isError) return <ErrorMessage error={error} />

    return (
        <div className="flex justify-center bg-white shadow-lg rounded-lg py-12">
            <div className="w-full max-w-4xl px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {achievements.map((achievement) => (
                        <Card
                            key={achievement.achievementId}
                            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                        >
                            <CardHeader className="p-0">
                                <img
                                    src={achievement.imageUrl}
                                    alt={achievement.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            </CardHeader>
                            <CardBody className="text-center p-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {achievement.name}
                                </h3>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
