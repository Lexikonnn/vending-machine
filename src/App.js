import { Routes, Route } from "react-router-dom";
import TablePage from "./pages/TablePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TablePage />} />
        <Route path="/:cityId" element={<TablePage />} />
        <Route path="/:cityId/:machineId" element={<TablePage />} />
      </Routes>
    </>
  );
}

export default App;
