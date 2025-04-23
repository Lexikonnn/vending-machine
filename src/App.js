import { Routes, Route } from "react-router-dom";
import LocationsPage from "./pages/LocationsPage";
import MachinePage from "./pages/MachinePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/lmachines" element={<MachinePage />} />
      </Routes>
    </>
  );
}

export default App;
