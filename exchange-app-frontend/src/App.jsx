import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Registration from "./components/RegistrationForm";
import AddItem from "./components/items/AddItemForm";
import Navbar from "./components/Navbar";
import ItemsPage from "./components/pages/ItemsPage";
import OffersPage from "./components/pages/OffersPage";
import { useContext } from "react";
import { AuthContext } from "./components/contexts/AuthContext";
import { RealTimeProvider } from "./components/contexts/RealTimeContext";
import LoginForm from "./components/LoginForm";
import { NotificationsProvider } from "./components/contexts/NotificationsContext";
import { OffersProvider } from "./components/contexts/OffersContext";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="app">
      {isAuthenticated ? (
        <NotificationsProvider>
          <OffersProvider>
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
          </OffersProvider>
        </NotificationsProvider>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
