import { useFetchData } from "../hooks/useFetchData";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react"
import SearchBar from "../components/searchBar/SearchBar";
import { useSearchFilter } from "../hooks/useSearchFilter";
import { hasExpiredSlot } from "../utils/expiration";
import Tag from "../components/tag/Tag";
import MainLayout from "../layout/MainLayout";
import Button from "../components/button/Button";
import "./styles.css";



const TablePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { cityId, machineId } = useParams();
    const navigate = useNavigate();
    const { data: machines, loading, error } = useFetchData("/machines.json");

    const selectedCity = machines?.find((c) => c.city.toLowerCase() === cityId?.toLowerCase());
    const selectedMachine = selectedCity?.automaty.find((m) => m.id === machineId);

    const filteredCities = useSearchFilter(machines, searchTerm);
    const filteredMachines = useSearchFilter(selectedCity?.automaty, searchTerm);


    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error: {error.message}</p>
    }




    return (
        <MainLayout>
            <div className="table-wrapper">
                <h1>Seznam Automatů</h1>
                <div className="tools-wrapper">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Hledat..."
                    />
                    <div><Button>Nový Automat</Button></div>
                </div>
                <nav className="route-nav">
                    <ul>
                        <li
                            className={!cityId ? "active" : ""}
                            onClick={() => navigate("/")}
                        >
                            Města
                        </li>

                        {selectedCity && (
                            <li
                                className={cityId && !machineId ? "active" : ""}
                                onClick={() => navigate(`/${selectedCity.city}`)}
                            >
                                {selectedCity.city}
                            </li>
                        )}

                        {selectedMachine && (
                            <li className={machineId ? "active" : ""}>
                                {selectedMachine.address}
                            </li>
                        )}
                    </ul>
                </nav>
                {!selectedCity && (
                    <table>
                        <thead>
                            <tr>
                                <th>Město</th>
                                <th>Počet automatů</th>
                                <th>Plnost</th>
                                <th>Expirace</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCities.map((city) => {
                                const allSlots = city.automaty.flatMap((a) => a.slots);
                                const hasEmptySlot = allSlots.some(
                                    (s) => !s.item || s.item.trim() === ""
                                );

                                const isExpired = hasExpiredSlot(city);

                                return (
                                    <tr key={city.city} onClick={() => { navigate(`/${city.city}`); setSearchTerm("") }}>
                                        <td>{city.city}</td>
                                        <td>{city.automaty.length}</td>
                                        <td>
                                            <Tag state={hasEmptySlot ? "alert" : "ok"}>
                                                {hasEmptySlot ? "EMPTY" : "FULL"}
                                            </Tag>
                                        </td>
                                        <td>
                                            <Tag state={isExpired ? "alert" : "ok"}>
                                                {isExpired ? "EXPIRED" : "FRESH"}
                                            </Tag>
                                        </td>
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
                                <th>Expirace</th>
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
                                        onClick={() => { navigate(`/${selectedCity.city}/${automat.id}`); setSearchTerm("") }}
                                    >
                                        <td>{automat.id}</td>
                                        <td>{automat.address}</td>
                                        <td>{automat.gps.join(", ")}</td>
                                        <td>
                                            <Tag state={hasEmptySlot ? "alert" : "ok"}>
                                                {hasEmptySlot ? "EMPTY" : "FULL"}
                                            </Tag>
                                        </td>
                                        <td>
                                            <Tag state={isExpired ? "alert" : "ok"}>
                                                {isExpired ? "EXPIRED" : "FRESH"}
                                            </Tag>
                                        </td>
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
        </MainLayout>
    );
}

export default TablePage;