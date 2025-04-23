import { useEffect, useState } from "react";
import { apiClient } from "../services/apiClient";

export const useFetchData = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const result = await apiClient(endpoint);
                setData(result);
            } catch (err) {
                setError(err);
            }
            finally {
                setLoading(false);
            }
        }

        load();
    }, [endpoint]);

    return { data, loading, error };
};