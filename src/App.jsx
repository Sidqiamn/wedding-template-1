import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Halaman1 from "./components/halaman1";
import Halaman2 from "./components/halaman2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Halaman1 />} />
        <Route path="/undangan" element={<Halaman2 />} />
      </Routes>
    </Router>
  );
}

export default App;
