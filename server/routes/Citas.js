const express = require('express');
const db = require('../models');
const router = express.Router();
const { Citas } = require ("../models")
const sequelize = require('sequelize')
const { validateToken } = require("../middlewares/AuthMiddleware")

//Buscar citas 

router.get("/", async(req, res)=>{
    const listaCitas = await Citas.findAll({
        include: [{
            model: db.Usuarios,
            as:"usuario"
        },
        {
            model: db.Medicos,
            as: "medico",
            attributes:{
                exclude:['createdAt', 'updatedAt']
            },
            include: [{
                attributes:{
                    exclude:['createdAt', 'updatedAt']
                },
                model: db.Especialidades,
                as: 'especialidad'
            },
            {
                attributes:{
                    exclude:['createdAt', 'updatedAt']
                },
                model: db.Eps,
                as: 'eps'
            }]
        }],
        attributes : {
            include:
                [
                    sequelize.fn
                    (
                      "DATE_FORMAT", 
                      sequelize.col("fecha"), 
                      "%d-%m-%Y"
                    ),
                    "fecha",
                ],
            exclude:['createdAt', 'updatedAt']
        }
    }); 
    res.json(listaCitas);
});


router.delete("/:citasId", async (req, res) => {
    const citasId = req.params.citasId;

    await Citas.destroy({
        where: {
            id: citasId,
        }
    })

    res.json("Eliminacion exitosa");
})

router.put("/:id",async (req, res) => {
    try{
        const { id } = req.params;
        const {direccion, fecha, hora, estado, medicoId, usuarioId} = req.body;
        await db.Citas.update(
            {direccion, fecha, hora, estado, medicoId, usuarioId},
            {
                where: {
                    id: id,
                }
            }
        );
        res.status(200).send("Cita actualizada") 
    }catch(error){
        res.status(404).send("No se pudo actualizar la cita");
    }

});



router.post("/", async(req, res)=>{
    const citas = req.body;
    await Citas.create(citas);
    res.json(citas);
});


module.exports = router;