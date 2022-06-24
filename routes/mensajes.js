// pat: /api/mensajes



const {Router} = require('express');

const { validarJWT } = require('../middlewares/validar-jswt');

const { obtenerChat}=require('../controllers/mensajes')

const router = Router();



router.get('/:emisor',validarJWT,obtenerChat)



module.exports=router