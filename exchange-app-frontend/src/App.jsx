import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Registration from "./components/RegistrationForm";
import Login from "./components/Login";
import AddItem from "./components/items/AddItemForm";
import Navbar from "./components/Navbar";
import ItemsPage from "./components/pages/ItemsPage";
import OffersPage from "./components/pages/OffersPage";
import { useContext } from "react";
import { AuthContext } from "./components/contexts/AuthContext";
import { RealTimeProvider } from "./components/contexts/RealTimeContext";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="app">
      
      {isAuthenticated ? (
        <RealTimeProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/items/get" />} />
            <Route exact path="/items/add" element={<AddItem />} />
            <Route exact path="/items/get" element={<ItemsPage />} />
            <Route exact path="/all-offers" element={<OffersPage />} />
            <Route path="*" element={<Navigate to="/items/get" />} />
          </Routes>
        </RealTimeProvider>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
