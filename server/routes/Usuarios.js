const express = require('express');
const db = require('../models');
const router = express.Router();
const { Usuarios } = require ("../models")
const bcrypt =  require('bcrypt');
const { validateToken } = require("../middlewares/AuthMiddleware")

const {  sign } = require('jsonwebtoken');


router.get("/",validateToken, async(req, res)=>{
    const listaUsuarios = await Usuarios.findAll({
        include:{
            model: db.Eps,
            as:"eps"
        }
    });
    res.json(listaUsuarios);
});

router.get("/miUsuario",validateToken, async (req, res) => {
    let id = req.usuario.id
    const usuario = await Usuarios.findOne({
        where: {
            id:id
        }
    });
    res.json(usuario);
});

router.delete("/:usuariosId",validateToken, async (req, res) => {
    const usuariosId = req.params.usuariosId;

    await Usuarios.destroy({
        where: {
            id: usuariosId,
        }
    })

    res.json("Eliminacion exitosa");
})

router.put("/:id",validateToken, async (req, res) => {
    try{
        const { id } = req.params;
        const {nombre, correo, fecha_nacimiento, eps_id, rol} = req.body;
        await db.Usuarios.update(
            {nombre, correo, fecha_nacimiento, eps_id, rol},
            {
                where: {
                    id: id,
                }
            }
        );
        res.status(200).send("Usuario actualizado") 
    }catch(error){
        res.status(404).send("No se pudo actualizar el usuario");
    }

});


router.post("/", async(req, res)=>{
    const usuario = req.body;
    bcrypt.hash(usuario.password, 10).then((hash) => {
        Usuarios.create({
            nombre: usuario.nombre,
            correo: usuario.correo,
            fecha_nacimiento: usuario.fecha_nacimiento,
            epsId: usuario.epsId,
            password: hash,
            rol:usuario.rol
        })
    })
    res.json(usuario);
});

router.post("/login", async (req, res) =>{
    const { correo, password} = req.body

    try{
        const usuario = await Usuarios.findOne({where: {correo:correo}})

        if(!usuario) res.json({error: "El usuario no existe"});

        bcrypt.compare(password, usuario.password).then((match)=>{
            if(!match) res.json({error: "Contraseña y usuario incorrectos"})

            const accessToken = sign({correo: usuario.correo, id:usuario.id, nombre:usuario.nombre, rol:usuario.rol }, "importantsecret")
            res.json({
                accessToken: accessToken,
            });
        })
    } catch(err){
        console.log(err)
    }
});


module.exports = router;