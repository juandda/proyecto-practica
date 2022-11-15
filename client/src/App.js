import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cita from './pages/Cita';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
          <Router>
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/nuevaCita" element={<Cita/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </Router>
  );
}

export default App;