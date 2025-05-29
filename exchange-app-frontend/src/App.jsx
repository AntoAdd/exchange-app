import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Registration from './components/RegistrationForm';
import Login from './components/Login';
import AddItem from './components/items/AddItemForm';
import Navbar from "./components/Navbar";
import ItemsPage from './components/pages/ItemsPage';
import OffersPage from './components/pages/OffersPage';


function App() {
  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route exact path='/register' element={<Registration />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/items/add' element={<AddItem />} />
          <Route exact path='/items/get' element={<ItemsPage />} />
          <Route exact path='/all-offers' element={<OffersPage />} />
        </Routes>
      </div>
  );
}

export default App;
