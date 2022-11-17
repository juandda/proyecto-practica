import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const MisCitas = () => {

  const [listaCitas, setListaCitas] = useState([]);
    

  useEffect(() =>{
    axios.get("http://localhost:3001/citas/misCitas", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
        setListaCitas(response.data);
        console.log(response.data);
    });
  },[]);

  const cancelar =  (id) => {
    const data = { estado: true};
    axios.put(`http://localhost:3001/citas/${id}`, data, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) => {
        alert(response.data);
        window.location.reload()
    });
}

  const columns = [
    {field: 'direccion', headerName: 'Direccion', width: 150, headerClassName:'table-container'},
    {field: 'fecha', headerName: 'Fecha', width: 150, headerClassName:'table-container'},
    {field: 'hora', headerName: 'Hora', width: 150, headerClassName:'table-container'},
    {field: 'medico', headerName: 'Medico', width: 200, headerClassName:'table-container'},
    {
        field: 'cancelar',
        headerName: 'Cancelar',
        headerClassName:'table-container',
        renderCell: (cita) =>{
            if(cita.row.estado == false){
                return(
                    <Button
                    color="error"
                    disabled={false}
                    onClick={()=>cancelar(cita.id)}
                    >
                        Cancelar
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

        <div style={{ height: 300, width: '56%'}} className='table-container'>
                <DataGrid 
                    sx={{
                            backgroundColor: '#D0B8A8',
                            display: 'flex',
                            margin: '0 auto',
                            marginTop: '100px',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }} 
                    rows={rows} 
                    columns={columns} 
                    isRowSelectable={() => false}/>        
        </div> 
  )
}

export default MisCitas