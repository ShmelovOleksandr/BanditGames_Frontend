import {Card, CardBody, Spinner} from "@nextui-org/react";
import { useGameAchievements } from "@/hooks/useGameAchievements.ts";
import { useKeycloak } from "@/hooks/useKeyCloak.ts";
import {usePlayerAchievements} from "@/hooks/usePlayerAchievements.ts";
import { FaCheckCircle } from "react-icons/fa";
import {ErrorMessage} from "@/components/Achivements/ErrorMessage.tsx"; // Import a success icon


interface GameAchievementsProps {
    backendUrl: string | undefined;
}

export interface Achievement {
    achievementId: string;
    name: string;
    description: string;
    imageUrl: string;
    isAchieved: boolean;
}

export const GameAchievements = ({ backendUrl }: GameAchievementsProps) => {
    const { userId } = useKeycloak();
    const { data: achievements = [], isLoading: gameAchievementsIsLoading, isError: gameAchivementsIsError, error: gameAchievementsError} = useGameAchievements(backendUrl);
    const {data: playerAchievements = [], isLoading: playerAchievementsIsLoading, isError: playerAchievementsIsError, error: playerAchievementsError } = usePlayerAchievements(backendUrl, userId);

    if (gameAchievementsIsLoading || playerAchievementsIsLoading) {
        return (
            <Spinner/>
        )
    }

    if (gameAchivementsIsError) {
        return (
            <ErrorMessage error={gameAchievementsError}/>
        )
    }

    if (playerAchievementsIsError) {
        return (
            <ErrorMessage error={playerAchievementsError}/>
        )
    }


    console.log("Display player Achievemet")
    console.log(JSON.stringify(playerAchievements))

    const mergedAchievements: Achievement[] = achievements.map((achievement) => ({
        ...achievement,
        isAchieved: playerAchievements.length === 0 ? false : playerAchievements.some(
            (playerAch) => playerAch.achievementId === achievement.achievementId
        ),
    }));

    return (
        <div className="flex justify-center shadow-lg rounded-lg py-12">
            <div className="w-full max-w-4xl px-6">
                <h2 className="text-2xl text-white font-bold text-center mb-8">
                    Game Achievements
                </h2>
                <div className="space-y-6">
                    {mergedAchievements &&
                        mergedAchievements.map((achievement: Achievement) => (
                            <Card
                                key={achievement.achievementId}
                                className="flex flex-row items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                                isHoverable
                                isPressable
                            >
                                {/* Image Section */}
                                <div className="w-1/3">
                                    <img
                                        src={achievement.imageUrl}
                                        alt={achievement.name}
                                        className="w-full h-full object-cover rounded-l-lg"
                                    />
                                </div>

                                {/* Text Section */}
                                <CardBody className="w-2/3 flex flex-col justify-center p-6 relative">
                                    <div className="flex items-center">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {achievement.name}
                                        </h3>
                                        {/* Success Icon for Achieved */}
                                        {achievement.isAchieved && (
                                            <FaCheckCircle
                                                className="ml-2 text-green-500"
                                                size={20}
                                                title="Achieved"
                                            />
                                        )}
                                    </div>
                                    <p className="text-gray-600 text-sm mt-2">
                                        {achievement.description}
                                    </p>
                                </CardBody>
                            </Card>
                        ))}
                </div>
            </div>
        </div>
    );
};
