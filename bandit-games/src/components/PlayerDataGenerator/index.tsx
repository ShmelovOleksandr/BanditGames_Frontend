
import {useGeneratePlayerData} from "@/hooks/useGeneratePlayerData.ts";
import ButtonComponent from "@/components/Button";

export default function PlayerDataGenerator() {
    const { recordCount, loading, error, generateData } = useGeneratePlayerData();

    return (
        <div className="bg-gray-800 max-w-fit p-6 text-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Generate Player Data</h3>
            <p className="text-gray-300 mb-6">
                Generate 1000 records of player data for statistics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <ButtonComponent actionClick={generateData}
                                 text={loading ? "Generating..." : "Generate Data"}
                />
                {recordCount !== null && (
                    <p className="mt-2 text-lg">
                        <strong>{recordCount}</strong> records successfully created.
                    </p>
                )}
                {error && <p className="mt-2 text-red-500">{error}</p>}
            </div>
        </div>
    );
}
