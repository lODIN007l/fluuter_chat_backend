const { response } = require("express");
const Usuario=require('../models/usuario');
const bcrypt=require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

const crearUsuario=async (req,res=response)=>{


    const {email,password}= req.body
    try {
            const existeEmail=await Usuario.findOne({email:email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'El correo ya esta registrado'
                })
            }

            const usuario=new Usuario(req.body)

            //ENCRIPTAR CONTRASENIA 
            const salt = bcrypt.genSaltSync();
            usuario.password=bcrypt.hashSync(password,salt);


            await usuario.save()
            
            //generar JWT 
            const token = await generarJWT(usuario.id);

                res.json({
                    ok:true,
                    usuario,
                    token
                })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Comuniquese con el servidor'
        })
    }



}

const logindeusuario=async (req,res=response)=>{

    const {email,password}=req.body


   try {
    const usuarioDB= await Usuario.findOne({email})

    if(!usuarioDB){
        return res.status(404).json({
            ok:false,
            msg:'Email no encontrado'
        })
    }

    const validarPassword=bcrypt.compareSync(password,usuarioDB.password);
    if(!validarPassword){
        return res.status(404).json({
            ok:false,
            msg:'La contraseña no es valida '
        })
    }

    //Generar el JWT 
    const token=await generarJWT(usuarioDB.id);
    res.json({
        ok:true,
        usuarioDB,
        token
    })


   } catch (error) {
    console.log(error)
    res.status(500).json({
        ok:false,
        msg:'Comuniquese con el servidor'
    })
   }
}

const renewToken=async (req,res=response)=>{

    //obtengo el id 
    //console.log(req);
    const uid=req.uid
    //genero un nuevo jwt en caso de no estar valido
    const token=await generarJWT(uid);
    //Obtengo el usuario por el UID
    const usuario=await Usuario.findById(uid);
    res.json({
        ok:true,
        usuario,
        token
    })
}





module.exports={
    crearUsuario,
    logindeusuario,
    renewToken
}