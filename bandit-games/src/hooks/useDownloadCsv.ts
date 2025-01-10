import { useContext, useState } from "react";
import SecurityContext from "@/context/SecurityContext";
import axios from "axios";

const apiUrl = import.meta.env.VITE_LOCAL_STATISTICS_URL;

export function useDownloadCsv() {
    const { isAuthenticated, keycloak } = useContext(SecurityContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const downloadCsv = async (endpoint: string, filename: string): Promise<void> => {
        if (!isAuthenticated) {
            const errorMessage = "User is not authenticated.";
            console.error(errorMessage);
            setError(errorMessage);
            return Promise.reject(errorMessage);
        }

        setLoading(true);
        setError(null);

        try {
            const token = keycloak?.token; // Ensure token is available
            const response = await axios.get(`${apiUrl}${endpoint}`, {
                responseType: "blob", // Handle binary data
                headers: {
                    Accept: "text/csv",
                    Authorization: `Bearer ${token}`, // Authorization header
                },
            });

            // Create a Blob from the response and download the file
            const blob = new Blob([response.data], { type: "text/csv" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Clean up
        } catch (err) {
            console.error("Error downloading CSV:", err);
            setError("Failed to download CSV. Please try again.");
            throw err; // Re-throw error for upstream handling
        } finally {
            setLoading(false);
        }
    };

    return { downloadCsv, loading, error };
}
