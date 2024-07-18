import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AttributesListPage from "./pages/AttributesListPage";
import AttributeDetailPage from "./pages/AttributeDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/attributes" element={<AttributesListPage />} />
          <Route path="/attributes/:id" element={<AttributeDetailPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
