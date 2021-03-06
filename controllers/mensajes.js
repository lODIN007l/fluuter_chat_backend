
const Mensaje = require('../models/mensaje');

const obtenerChat = async(req, res) => {

    const miId = req.uid;
    const mensajesDe = req.params.emisor;
   

    const last30 = await Mensaje.find({
        $or: [{ emisor: miId, para: mensajesDe }, { emisor: mensajesDe, para: miId } ]
    })
    .sort({ createdAt: 'desc' })
    .limit(30);

    res.json({
        ok: true,
        mensajes: last30
      
    })

}



module.exports = {
    obtenerChat
}