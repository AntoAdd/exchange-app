import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/RegistrationForm';
import React from "react";
import Login from './components/LoginForm';
import AddItem from './components/AddItemForm';
import Navbar from "./components/Navbar";
import ItemsPage from './components/ItemsPage';
import UserOffersPage from './components/pages/UserOffersPage';
import OffersPage from './components/pages/OffersPage';


function App() {
  return (
    <Router future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path='/register' element={<Registration />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/items/add' element={<AddItem />} />
          <Route exact path='/items/get' element={<ItemsPage />} />
          <Route exact path='/my-offers' element={<UserOffersPage />} />
          <Route exact path='/all-offers' element={<OffersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
