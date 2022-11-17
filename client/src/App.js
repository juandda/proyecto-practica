import './App.css';
import React from 'react';
import {BrowserRouter as Router, useNavigate, Route, Routes} from 'react-router-dom';
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
import { AppBar, 
         Box, 
         Button, 
         IconButton, 
         List, 
         ListItem, 
         ListItemButton, 
         ListItemIcon, 
         ListItemText, 
         ThemeProvider, 
         Toolbar, 
         Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import theme from './ThemeConfig';
import ListarEps from './pages/ListarEps';
import ListarEspecialidades from './pages/ListarEspecialidades';
import ListarMedicos from './pages/ListarMedicos';
import ListarCitas from './pages/ListarCitas';

function App() {
  const [authState, setAuthState] = useState(false)
  let navigate = useNavigate()

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const listaMenu = [{
                nombre : 'Agendar Cita',
                ruta: "/nuevaCita",
              },
              {
                nombre : 'Mis Citas',
                ruta: "/misCitas",
              },
              {
                nombre : 'Eps',
                ruta: "/listarEps",
              },
              {
                nombre : 'Especialidades',
                ruta: "/listarEspecialidades",
              },
              {
                nombre : 'Medicos',
                ruta: "/listarMedicos",
              },
              {
                nombre : 'Administrar Citas',
                ruta: "/listarCitas",
              }]

  const list = (anchor) => (
        <List>
        {listaMenu.map((text, index) => (
          <ListItem key={text.nombre} disablePadding>
            <ListItemButton onClick={() => {navigate(text.ruta)}}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={text.nombre} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
  );

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login")
};

      if(!localStorage.getItem("accessToken")){
        return (
            <ThemeProvider theme={theme}>
              <AuthContext.Provider value={{ authState, setAuthState }}>
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
                    <Route path="/listarEps" element={<ListarEps/>}/>
                    <Route path="/listarEspecialidades" element={<ListarEspecialidades/>}/>
                    <Route path="/listarMedicos" element={<ListarMedicos/>}/>
                    <Route path="/listarCitas" element={<ListarCitas/>}/>
                  </Routes>
              </AuthContext.Provider>
            </ThemeProvider>
      )}else{
        return (
          <ThemeProvider theme={theme}>
            <AuthContext.Provider value={{ authState, setAuthState }}>
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
                <Route path="/listarEps" element={<ListarEps/>}/>
                <Route path="/listarEspecialidades" element={<ListarEspecialidades/>}/>
                <Route path="/listarMedicos" element={<ListarMedicos/>}/>
                <Route path="/listarCitas" element={<ListarCitas/>}/>
              </Routes>
              <AppBar component="nav">
                  <Toolbar
                    sx={{ display: 'flex', justifyContent:'space-between'  }}
                  >
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Button
                      variant="h6"
                      component="div"
                      sx={{flexGrow: 0, width: 10}}
                      onClick={toggleDrawer('left', true)}
                    >
                      <MenuIcon sx={{ fontSize: 35, color: 'white'}} />
                    </Button>
                    <Box>
                      <Button 
                          sx={{color: 'white'}}
                          onClick={logout}
                      >
                          Cerrar Sesion
                    </Button>
                    </Box>
                    {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                      <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer('left', false)}
                      >
                        {list(anchor)}
                      </Drawer>
                    </React.Fragment>
                  ))}
                  </Toolbar>
              </AppBar>
            </AuthContext.Provider>
        </ThemeProvider>
        )
      }
}

export default App;


