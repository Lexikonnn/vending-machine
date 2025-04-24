import { useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
import "./styles.css";

const TablePage = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const { data: machines, loading, error } = useFetchData("/machines.json");

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

    return (
        <div>
            <nav>
                <ul>
                    <li onClick={() => {
                        setSelectedCity(null);
                        setSelectedMachine(null);
                    }}>Města</li>

                    {selectedCity && (
                        <li onClick={() => setSelectedMachine(null)}>
                            / {selectedCity.city}
                        </li>
                    )}

                    {selectedMachine && (
                        <li>/ {selectedMachine.address}</li>
                    )}
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
                        {machines.map((city) => {
                            const allSlots = city.automaty.flatMap((automat) => automat.slots);
                            const hasEmptySlot = allSlots.some((slot) => !slot.item || slot.item.trim() === "");

                            return (
                                <tr key={city.id} onClick={() => setSelectedCity(city)}>
                                    <td>{city.city}</td>
                                    <td>{city.automaty.length}</td>
                                    <td>{hasEmptySlot ? "EMPTY" : "FULL"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
            {(selectedCity && !selectedMachine) && (
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
                        {selectedCity.automaty.map((automat) => {
                            const hasEmptySlot = automat.slots.some(
                                (slot) => !slot.item || slot.item.trim() === ""
                            );

                            const isExpired = hasExpiredSlot(automat);

                            return (
                                <tr key={automat.id} onClick={() => setSelectedMachine(automat)}>
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
                            <td>ID</td>
                            <td>Jídlo</td>
                            <td>Vloženo</td>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedMachine.slots.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.item}</td>
                                    <td>{item.placedAt}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TablePage;