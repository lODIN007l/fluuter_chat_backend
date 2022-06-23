//path : api/login
///
const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario,logindeusuario,renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jswt');



const router = Router();

router.post('/new',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es invalida').not().isEmpty(),
    check('email','El email no es valido').isEmail(),
    validarCampos

],crearUsuario)

router.post('/',[
    check('password','La contraseña es invalida').not().isEmpty(),
    check('email','El email no es valido').isEmail(),
    validarCampos
],logindeusuario)

router.get('/renew',validarJWT,renewToken)



module.exports=router