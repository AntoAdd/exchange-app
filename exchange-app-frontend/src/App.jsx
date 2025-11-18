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
import { TradesProvider } from "./components/contexts/TradesContext";
import TradesPage from "./components/pages/TradesPage";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="app">
      {isAuthenticated ? (
        <NotificationsProvider>
          <OffersProvider>
            <TradesProvider>
              <RealTimeProvider>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Navigate to="/items/get" />} />
                  <Route exact path="/items/add" element={<AddItem />} />
                  <Route exact path="/items/get" element={<ItemsPage />} />
                  <Route exact path="/all-offers" element={<OffersPage />} />
                  <Route exact path="/trades" element={<TradesPage />} />
                  <Route path="*" element={<Navigate to="/items/get" />} />
                </Routes>
              </RealTimeProvider>
            </TradesProvider>
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
