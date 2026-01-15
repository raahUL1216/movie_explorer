import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import ActorProfile from "./pages/ActorProfile";
import DirectorProfile from "./pages/DirectorProfile";
import "./styles/layout.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/actors/:id" element={<ActorProfile />} />
        <Route path="/directors/:id" element={<DirectorProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
