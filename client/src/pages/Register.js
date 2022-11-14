import React from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../App.css'
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function Register() {

    const initialValues = {
        nombre: "",
        correo:"",
        fecha_nacimiento:"",
        password:""
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required(),
        correo:Yup.string().required(),
        fecha_nacimiento:Yup.date().required(),
        clave:Yup.string().required(),
    })

    const onSubmit= (data) =>{
        axios.post("http://localhost:3001/usuarios", data).then(() =>{
            
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
                    <PersonIcon sx={{ fontSize: 110, color: '#393E46'}}></PersonIcon>
                    <ErrorMessage name="nombre" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="nombre"
                        placeholder="Nombre"
                        label = "Nombre"
                    />

                    <ErrorMessage name="correo" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="correo"
                        placeholder="Correo"
                        label = "Correo"
                    />

                    <ErrorMessage name="fecha_nacimiento" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="fecha_nacimiento"
                        placeholder="Fecha Nacimiento"
                        label = "Fecha Nacimiento"
                    />

                    <ErrorMessage name="clave" component="span" />
                    <Field
                        autocomplete="off"
                        type="password"
                        id="inputCreatePost"
                        name="clave"
                        placeholder="Clave"
                        label = "Clave"
                    />
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

export default Register