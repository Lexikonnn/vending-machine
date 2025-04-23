const URL = '/data';

export const apiClient = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${URL}${endpoint}`, {
            headers: { 'Content-type': 'application/json' },
            ...options,
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    }

    catch (error) {
        console.log("API client error", error);
        throw error;
    }
}