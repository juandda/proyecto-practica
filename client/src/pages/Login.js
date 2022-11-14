import React, { useState } from 'react'
import axios from 'axios';
import { Button, Box, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import '../App.css'

function Login() {
    
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const login = () => {
        const data = {correo: correo, password: password}
        axios.post("http://localhost:3001/usuarios/login", data).then((response) => {
            if(response.data.error) {
                alert(response.data.error)
            }else{
                sessionStorage.setItem("accessToken", response.data.accessToken)
                sessionStorage.setItem("id", response.data.usuarioId)
            }
        })
    }
    return (
        <Box sx={{component: "form",
                  width: 300, 
                  height: 400, 
                  margin: 'auto',
                  marginTop: '60px',
                  display: 'flex', 
                  justifyContent:'center',
                  alignItems: 'center',  
                  direction: 'column',
                  backgroundColor: '#F7F7F7',
                  borderRadius:'7px',
                  '& .MuiInputBase-root': { m: 1, height: '50px', width: '200px', backgroundColor: 'white' },
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
                    onClick={login}>Ingresar
                </Button>
            </div>
        </Box>
  )
}

export default Login