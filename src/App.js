import { Routes, Route } from "react-router-dom";
import TablePage from "./pages/TablePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/table" element={<TablePage />} />
      </Routes>
    </>
  );
}

export default App;
