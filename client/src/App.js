import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cita from './pages/Cita';
import Login from './pages/Login';
import Register from './pages/Register';
import MisCitas from './pages/MisCitas';
import RegistrarCita from './pages/RegistrarCitas';
import { AuthContext } from './helpers/AuthContext'; 
import { useState } from 'react';
import RegistrarMedico from './pages/RegistrarMedicos';
import RegistrarEps from './pages/RegistrarEps';
import RegistrarEspecialidad from './pages/RegistrarEspecialidad';

function App() {
  const [authState, setAuthState] = useState(false)

  return (
        <AuthContext.Provider value={{authState, setAuthState}}>
          <Router>
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/misCitas" element={<MisCitas/>}/>
              <Route path="/nuevaCita" element={<Cita/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/registrarCita" element={<RegistrarCita/>}/>
              <Route path="/registrarMedico" element={<RegistrarMedico/>}/>
              <Route path="/registrarEps" element={<RegistrarEps/>}/>
              <Route path="/registrarEspecialidad" element={<RegistrarEspecialidad/>}/>
            </Routes>
          </Router>
        </AuthContext.Provider>
  );
}

export default App;