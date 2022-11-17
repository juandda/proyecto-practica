import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ListarEps = () => {

  const [listaEps, setListaEps] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{
    axios.get("http://localhost:3001/eps", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
        setListaEps(response.data);
        console.log(response.data);
    });
  },[]);

  const NuevoRegistro =  () => {
      navigate("/registrarEps");
  }

  const columns = [
    {field: 'nombre', headerName: 'Nombre', width: 150, headerClassName:'table-container'},
    {field: 'telefono', headerName: 'Telefono', width: 150, headerClassName:'table-container'}
  ]

  const rows = listaEps?.map(eps => {
    return {
        nombre: eps?.nombre,
        telefono: eps?.telefono,
        id:eps?.id
    }
})

  return (

        <div style={{ height: 300, width: '47%', textAlign:'-webkit-center' ,marginTop:'100px', backgroundColor:'white'}} className='table-container'>
                 <Button
                  color="primary"
                  disabled={false}
                  onClick={NuevoRegistro}
                >
                    Nuevo Registro
                </Button>
                <DataGrid 
                    sx={{
                            backgroundColor: 'white',
                            display: 'flex',
                            margin: '0 auto',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }} 
                    rows={rows} 
                    columns={columns} 
                    isRowSelectable={() => false}/>        
        </div> 
  )
}

export default ListarEps