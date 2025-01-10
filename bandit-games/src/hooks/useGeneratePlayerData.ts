import {useContext, useState} from "react";
import axios from "axios";
import SecurityContext from "@/context/SecurityContext.ts";

const apiUrl = import.meta.env.VITE_LOCAL_STATISTICS_URL;

export const useGeneratePlayerData = () => {
    const { keycloak } = useContext(SecurityContext);
    const [recordCount, setRecordCount] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const endpoint = "/api/v1/players";

    const generateData = async () => {
        setLoading(true);
        setError(null);
        const token = keycloak?.token;
        try {
            const response = await axios.post(`${apiUrl}${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRecordCount(response.data);
        } catch (err) {
            setError("Failed to generate data. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { recordCount, loading, error, generateData };
};
