import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CandidateFormPage from "./pages/CandidateFormPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/candidate/new" element={<CandidateFormPage />} />
    </Routes>
  );
}
