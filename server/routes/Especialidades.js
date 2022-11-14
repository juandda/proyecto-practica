const express = require('express');
const router = express.Router();
const { Especialidades } = require ("../models")


router.get("/", async(req, res)=>{
    const listaEspecialidades = await Especialidades.findAll();
    res.json(listaEspecialidades);
});

router.delete("/:especialidadesId", async (req, res) => {
    const especialidadesId = req.params.especialidadesId;

    await Especialidades.destroy({
        where: {
            id: especialidadesId,
        }
    })

    res.json("Eliminacion exitosa");
})

router.put("/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const {nombre} = req.body;
        await db.Especialidades.update(
            {nombre, telefono},
            {
                where: {
                    id: id,
                }
            }
        );
        res.status(200).send("Especialidad actualizada") 
    }catch(error){
        res.status(404).send("No se pudo actualizar la especialidades");
    }

});


router.post("/", async(req, res)=>{
    const especialidad = req.body;
    await Especialidades.create(especialidad);
    res.json(especialidad);
});


module.exports = router;