import {useDownloadCsv} from "@/hooks/useDownloadCsv.ts";
import ButtonComponent from "@/components/Button";

export default function ExportStatistics() {
    const { downloadCsv } = useDownloadCsv();

    const handleExportPlayers = async () => {
        try {
            await downloadCsv("/api/v1/players/csv", "players_statistics.csv");
            console.log("Player data downloaded successfully.");
        } catch (error) {
            console.error("Failed to download player data:", error);
        }
    };

    const handleExportSessions = async () => {
        try {
            await downloadCsv("/api/v1/sessions/csv", "sessions_statistics.csv");
            console.log("Session data downloaded successfully.");
        } catch (error) {
            console.error("Failed to download session data:", error);
        }
    };

    return (
        <div className="bg-gray-800 max-w-fit p-6 rounded-lg shadow-md text-white">
            <h3 className="text-lg font-bold mb-4">Export Game Statistics</h3>
            <p className="text-gray-300 mb-6">
                Use the options below to export player and session statistics in CSV format.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <ButtonComponent
                    actionClick={handleExportPlayers}
                    text={"Export Player Data (CSV)"}
                />
                <ButtonComponent
                    actionClick={handleExportSessions}
                    text={"Export Session Data (CSV)"}
                />
            </div>
        </div>
    );
}
