import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from "./pages/Home"
import Cita from './pages/Cita';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
    <div className="App">
      <Router>
        <Link to="nuevaCita">Nueva Cita</Link>
        <Link to="login">Login</Link>
        <Link to="register">Register</Link>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/nuevaCita" element={<Cita/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;