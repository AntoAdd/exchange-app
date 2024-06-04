import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import React from "react";
import Login from './components/Login';
import AddItem from './components/AddItem';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/register' element={<Registration />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/items/add' element={<AddItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
