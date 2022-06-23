const mongoose = require('mongoose');
require('dotenv').config();
const dbConection = async ()=>{

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB en linea');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos ');
    }

}

module.exports={
    dbConection
}