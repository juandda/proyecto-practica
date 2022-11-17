const express = require('express');
const db = require('../models');
const router = express.Router();
const { Eps } = require ("../models")
const { validateToken } = require("../middlewares/AuthMiddleware")


router.get("/", async(req, res)=>{
    const listaEps = await Eps.findAll();
    res.json(listaEps);
});

router.delete("/:epsId",validateToken, async (req, res) => {
    const epsId = req.params.epsId;

    await Eps.destroy({
        where: {
            id: epsId,
        }
    })

    res.json("Eliminacion exitosa");
})

router.put("/:id",validateToken, async (req, res) => {
    try{
        const { id } = req.params;
        const {nombre, telefono} = req.body;
        await db.Eps.update(
            {nombre, telefono},
            {
                where: {
                    id: id,
                }
            }
        );
        res.status(200).send("Eps actualizada") 
    }catch(error){
        res.status(404).send("No se pudo actualizar la eps");
    }

});


router.post("/",validateToken, async(req, res)=>{
    const eps = req.body;
    await Eps.create(eps);
    res.json(eps);
});

module.exports = router;