import { apiClient } from "./apiClient";

export const fetchMachines = async () => {
    return apiClient('/machines.json');
}