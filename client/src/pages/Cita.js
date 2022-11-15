import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
//sweet alert

function Cita() {

    const [listaCitas, setListaCitas] = useState([]);
    let navigate = useNavigate();

    useEffect(() =>{
        axios.get("http://localhost:3001/citas").then((response) => {
            setListaCitas(response.data);
            console.log(response.data);
        });
    },[]);

    const reserve =  (id) => {
        const data = {usuarioId: sessionStorage.getItem('id'),
                      estado: false,
                    };
        axios.put(`http://localhost:3001/citas/${id}`, data).then((response) => {
            alert(response.data);
            window.location.reload()
        });
    }
    
    const columns = [
        {field: 'direccion', headerName: 'Direccion', width: 150},
        {field: 'fecha', headerName: 'Fecha', width: 150},
        {field: 'hora', headerName: 'Hora', width: 150},
        {field: 'medico', headerName: 'Medico', width: 150},
        {
            field: 'reserve',
            headerName: 'Reservar',
            renderCell: (cita) =>{
                if(cita.row.estado === true){
                    return(
                        <Button
                        disabled={false}
                        onClick={()=>reserve(cita.id)}
                        >
                            reservar
                        </Button>
                    );
                }else{
                    return(
                        <Button
                        disabled={true}
                        onClick={()=>reserve(cita.id)}
                        >
                            reservar
                        </Button>
                    );
                }
            }
            
        }
    ]

    const rows = listaCitas?.map(cita => {
        return {
            direccion: cita?.direccion,
            fecha: cita?.fecha,
            hora: cita?.hora,
            medico: cita?.medico?.nombre,
            estado: cita?.estado,
            id: cita?.id,
        }
    })


    return (
        <>
            <nav>
                <a href="/misCitas">Mis Citas</a>
            </nav>
            <div style={{ height: 500, width: '55%' }} class = "dataGrid-container">
                <DataGrid 
                     sx={{
                        backgroundColor: '#D0B8A8',
                        display: 'flex',
                        margin: '0 auto',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }} 
                    rows={rows} 
                    columns={columns} 
                    rowsPerPageOptions={[10]}
                    isRowSelectable={(params) => false}/>        
            </div> 
        </>
    )
}

export default Cita;


