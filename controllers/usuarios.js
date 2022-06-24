const { response } = require("express");
const Usuario=require('../models/usuario');
 

const getUsuarios=async (req,res=response)=>{
    
    //pa sort = "-"=>ascendente y sin eso lo contrario

    //paginacion con "desde"
    const desde = Number(req.query.desde)||0;

    const usuarioDB=await Usuario
    .find({_id:{$ne:req.uid}})
    .sort('-online')
    .skip(desde)
    .limit(20)
    res.json({
        ok:true,
        usuarioDB
    })

}


module.exports={
    getUsuarios
}