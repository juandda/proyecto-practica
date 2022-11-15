import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
//sweet alert

function Cita() {

    const [listaCitas, setListaCitas] = useState([]);
    

    useEffect(() =>{
        axios.get("http://localhost:3001/citas").then((response) => {
            setListaCitas(response.data);
            console.log(response.data);
        });
    },[]);

    const reserve =  (id) => {
        const data = {usuarioId: sessionStorage.getItem('id'),
                      estado: false};
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
            
            </nav>
            <div style={{ height: 300, width: '55%' }} class = "dataGrid-container">
                <DataGrid rows={rows} columns={columns} isRowSelectable={(params) => false} isCellEditable={(params)=>false}/>        
            </div> 
        </>
    )
}

export default Cita;


