import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/RegistrationForm';
import React from "react";
import Login from './components/LoginForm';
import AddItem from './components/AddItemForm';
import Navbar from "./components/Navbar";
import Items from './components/Items';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path='/register' element={<Registration />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/items/add' element={<AddItem />} />
          <Route exact path='/items/get' element={<Items />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
