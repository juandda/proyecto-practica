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

function RegistrarEps    () {

    const initialValues = {
        nombre: "",
        telefono: ""
    };
    let navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required(),
        telefono: Yup.number().required()
    })


    const onSubmit= (data) =>{
        axios.post("http://localhost:3001/eps", 
            {
                nombre:data.nombre,
                telefono:data.telefono
            }).then((response) =>{   
                Swal.fire({
                    icon: 'success',
                    title: 'la eps se ha registrado correctamente',
                    timer: 2000
                })
                navigate("/listarEps");
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
                    <h2> Registro de Eps</h2>
                    <ErrorMessage name="nombre" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="nombre"
                        placeholder="Nombre"
                        label = "Nombre"
                    />
                    <ErrorMessage name="telefono" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="telefono"
                        placeholder="telefono"
                        label = "telefono"
                    />

                    <Button 
                        sx={{backgroundColor: 'white',
                            marginTop: '30px',
                            color: '#393E46'}}
                        type = "submit"    
                        onSubmit={onSubmit}>Registrar
                    </Button>
                    <Button 
                        sx={{
                            marginTop: '30px',
                            color: '#393E46'}}
                            color='secondary'
                            variant="contained"
                        type = "submit"    
                        onClick={()=>{navigate("/listarEps")}}>Volver
                    </Button>
                </Form>
            </Formik>
        </div>
    )
}


export default RegistrarEps;


