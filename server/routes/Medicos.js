const express = require('express');
const db = require('../models');
const router = express.Router();
const { Medicos } = require ("../models")
const { validateToken } = require("../middlewares/AuthMiddleware")

router.get("/",validateToken, async(req, res)=>{
    const listaMedicos = await Medicos.findAll({
        include: [{
            model: db.Especialidades,
            as:"especialidad"
        },
        {
            model: db.Eps,
            as:"eps"
        }]
    }); 
    res.json(listaMedicos);
});

router.delete("/:medicosId",validateToken, async (req, res) => {
    const medicosId = req.params.medicosId;

    await Medicos.destroy({
        where: {
            id: medicosId,
        }
    })

    res.json("Eliminacion exitosa");
})

router.put("/:id",validateToken, async (req, res) => {
    try{
        const { id } = req.params;
        const {nombre, especialidad, epsId} = req.body;
        await db.Medicos.update(
            {nombre, especialidad, epsId},
            {
                where: {
                    id: id,
                }
            }
        );
        res.status(200).send("Medico actualizado") 
    }catch(error){
        res.status(404).send("No se pudo actualizar el medico");
    }

});

router.post("/", validateToken, async(req, res)=>{
    const medicos = req.body;
    await Medicos.create(medicos);
    res.json(medicos);
});


module.exports = router;