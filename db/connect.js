const mongoose = require('mongoose');
const config = require('../config/key');
const db = config.connectionString;

const connectDB = async()=>{

    try{
        await mongoose.connect(db,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Connected to DB");
    } catch (error) {
    console.log("DB error")
   }
}

module.exports = connectDB;



