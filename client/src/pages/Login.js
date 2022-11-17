import React, { useState, useContext } from 'react'
import axios from 'axios';
import { Button, Box, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import '../App.css'
import { useNavigate } from 'react-router-dom';
 import { AuthContext } from '../helpers/AuthContext';

function Login() {
    
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const {setAuthState} = useContext(AuthContext)
    let navigate = useNavigate();

    const login = () => {
        const data = {correo: correo, password: password}
        axios.post("http://localhost:3001/usuarios/login", data).then((response) => {
            if(response.data.error) {
                alert(response.data.error)
            }else{
                localStorage.setItem("accessToken", response.data.accessToken)
                setAuthState(true)
                navigate("/nuevaCita")
            }
        })
    }
    return (
        <div className='login-full'>
            <div className='promo-container'>
                <h1>¡Bienvenido a Tramisalud!</h1>
                <h2>¿Aún tardas mucho tiempo en solicitar citas médicas?</h2>
                <p>No te preocupes más, nosotros te ayudamos. Te colaboramos en realizar el proceso de solicitudes médicas, así podrás ahorrar mucho más tiempo en trayectos y tiempo de espera en la entidad de salud. Servimos como intermediario de la eps a la que estás afiliado.</p>
            </div>
            <Box sx={{component: "form",
                    width: 400, 
                    height: 500, 
                    marginTop: '50px',
                    display: 'flex', 
                    justifyContent:'center', 
                    direction: 'column',
                    backgroundColor: '#F7F7F7',
                    borderRadius:'7px',
                    '& .MuiInputBase-root': { m: 1, height: '50px', width: '250px', backgroundColor: 'white' },
                    }}
            >
                
                <div className='login-container'>
                    <PersonIcon sx={{ fontSize: 110, color: '#393E46'}}></PersonIcon>
                    <TextField
                        sx={{marginBottom: 2}}    
                        type="text"
                        required
                        label = "Correo"
                        onChange={(event) => {
                            setCorreo(event.target.value)
                        }}
                    />
                    <TextField 
                        type="password"
                        required
                        label = "Contraseña"
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                    <Button 
                        sx={{backgroundColor: 'white',
                            marginTop: '30px',
                            color: '#393E46'}}
                        onClick={login}
                    >
                        Ingresar
                    </Button>
                    <a href="/register">Crear una cuenta</a>
                </div>
            </Box>
        </div>
  ) 
}

export default Login