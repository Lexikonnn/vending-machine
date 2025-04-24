import { useFetchData } from "../hooks/useFetchData";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react"
import SearchBar from "../components/searchBar/SearchBar";
import "./styles.css";



const objectMatchesSearch = (obj, term) => {
    const lowerTerm = term.toLowerCase();

    return Object.values(obj).some((value) => {
        if (typeof value === "string" || typeof value === "number") {
            return String(value).toLowerCase().includes(lowerTerm);
        }

        if (Array.isArray(value)) {
            return value.some((item) => typeof item === "string" && item.toLowerCase().includes(lowerTerm));
        }

        if (typeof value === "object" && value !== null) {
            return objectMatchesSearch(value, term); // rekurzivní hledání
        }

        return false;
    });
};


const TablePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { cityId, machineId } = useParams();
    const navigate = useNavigate();
    const { data: machines, loading, error } = useFetchData("/machines.json");

    const selectedCity = machines?.find((c) => c.city.toLowerCase() === cityId?.toLowerCase());
    const selectedMachine = selectedCity?.automaty.find((m) => m.id === machineId);

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error: {error.message}</p>
    }




    const hasExpiredSlot = (automat) => {
        const now = new Date();
        return automat.slots.some(slot => {
            if (!slot.placedAt) return false;
            const placedDate = new Date(slot.placedAt);
            const diffInDays = (now - placedDate) / (1000 * 60 * 60 * 24);
            return diffInDays > 2;
        });
    };




    const filteredCities = machines.filter((city) =>
        objectMatchesSearch(city, searchTerm)
    );

    const filteredMachines = selectedCity?.automaty.filter((automat) =>
        objectMatchesSearch(automat, searchTerm)
    );


    return (
        <div>
            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Hledat..."
            />
            <nav className="route-nav">
                <ul>
                    <li onClick={() => navigate("/")}>Města</li>

                    {selectedCity && (
                        <li onClick={() => navigate(`/${selectedCity.city}`)}>
                            / {selectedCity.city}
                        </li>
                    )}

                    {selectedMachine && (
                        <li>/ {selectedMachine.address}</li>
                    )}
                    {selectedMachine && <li>/ {selectedMachine.address}</li>}
                </ul>
            </nav>
            {!selectedCity && (
                <table>
                    <thead>
                        <tr>
                            <th>Město</th>
                            <th>Počet automatů</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCities.map((city) => {
                            const allSlots = city.automaty.flatMap((a) => a.slots);
                            const hasEmptySlot = allSlots.some(
                                (s) => !s.item || s.item.trim() === ""
                            );

                            return (
                                <tr key={city.city} onClick={() =>{navigate(`/${city.city}`); setSearchTerm("")}}>
                                    <td>{city.city}</td>
                                    <td>{city.automaty.length}</td>
                                    <td>{hasEmptySlot ? "EMPTY" : "FULL"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            {selectedCity && !selectedMachine && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Adresa</th>
                            <th>GPS</th>
                            <th>Status</th>
                            <th>Umístěno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMachines.map((automat) => {
                            const hasEmptySlot = automat.slots.some(
                                (slot) => !slot.item || slot.item.trim() === ""
                            );
                            const isExpired = hasExpiredSlot(automat);

                            return (
                                <tr
                                    key={automat.id}
                                    onClick={() =>{navigate(`/${selectedCity.city}/${automat.id}`); setSearchTerm("")} }
                                >
                                    <td>{automat.id}</td>
                                    <td>{automat.address}</td>
                                    <td>{automat.gps.join(", ")}</td>
                                    <td>{hasEmptySlot ? "EMPTY" : "FULL"}</td>
                                    <td>{isExpired ? "EXPIRED" : "OK"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            {selectedMachine && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Jídlo</th>
                            <th>Vloženo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedMachine.slots.map((slot) => (
                            <tr key={slot.id}>
                                <td>{slot.id}</td>
                                <td>{slot.item}</td>
                                <td>{slot.placedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TablePage;