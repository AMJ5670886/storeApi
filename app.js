const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000
const connectDB = require('./db/connect');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

//database
connectDB();

//middleware
app.use(express.json());

//routes
// app.get('/',(req,res)=>{
//     res.status(200).json({msg:"products"});
// })
app.use('/api/p1/products',require('./routes/products'))
app.use(notFound);
app.use(errorHandler);
//port
app.listen(PORT,
    console.log(`app is running on ${PORT}`)
);