import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import '../App.css';
import { Button, Select, InputLabel,MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Swal from 'sweetalert2';
//sweet alert

function RegistrarMedico    () {

    const initialValues = {
        nombre: "",
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required()
    })

    let navigate = useNavigate();

    const [listaEps, setListaEps] = useState([]);

    const [eps, setEps] = useState('');

    const [listaEspecialidades, setListaEspecialidades] = useState([]);

    const [especialidad, setEspecialidad] = useState('');



    useEffect(() =>{
        axios.get("http://localhost:3001/eps").then((response) => {
            setListaEps(response.data);
            console.log(response.data);
        });

        axios.get("http://localhost:3001/especialidades").then((response) => {
            setListaEspecialidades(response.data);
            console.log(response.data);
        });
    },[]);

    const handleChange = (event) => {
        setEspecialidad(event.target.value);
        setEps(event.target.value);
    }

    const onSubmit= (data) =>{
        axios.post("http://localhost:3001/medicos", 
            {
                nombre:data.nombre,
                epsId:eps, 
                especialidadId:especialidad, 
            }).then((response) =>{   
                Swal.fire({
                    icon: 'success',
                    title: 'El medico se ha registrado correctamente',
                    timer: 2000
                })
                window.location.reload();
        })
    }

    return (
        <div className='form-container'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <h2> Registro de Medicos</h2>
                    <ErrorMessage name="nombre" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="nombre"
                        placeholder="Nombre"
                        label = "Nombre"
                    />

                  
                    <InputLabel id="eps-id">Eps</InputLabel>
                    <Select
                        labelId="eps-id"
                        id="select-eps"
                        value={eps}
                        onChange={handleChange}
                        sx = {{width:200}}
                    >
                        {listaEps.map((eps) => {
                            return(
                                <MenuItem key={eps.id} value={eps.id}>{eps.nombre}</MenuItem>
                            );
                        })}
                    </Select>

                    <InputLabel id="especialidad-id">especialidad</InputLabel>
                    <Select
                        labelId="especialidad-id"
                        id="select-especialidad"
                        value={especialidad}
                        onChange={handleChange}
                        sx = {{width:200}}
                    >
                        {listaEspecialidades.map((especialidad) => {
                            return(
                                <MenuItem key={especialidad.id} value={especialidad.id}>{especialidad.nombre}</MenuItem>
                            );
                        })}
                    </Select>

                    <Button 
                        sx={{backgroundColor: 'white',
                            marginTop: '30px',
                            color: '#393E46'}}
                        type = "submit"    
                        onSubmit={onSubmit}>Registrar
                    </Button>
                </Form>
            </Formik>
        </div>
    )
}


export default RegistrarMedico;


