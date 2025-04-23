import { useFetchData } from "../hooks/useFetchData";


const LocationsPage = () => {
    const { data: machines, loading, error } = useFetchData("/machines.json");

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error: {error.message}</p>
    }

    return (
        <div>
            <ul>
                {machines.map((machine) => (
                    <li key={machine.id}>{machine.city}</li>
                ))}
            </ul>
        </div>
    );
}

export default LocationsPage;