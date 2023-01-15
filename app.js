const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors  = require('cors');
const databaseconnect = require('./db/connectdb');
const userRoutes = require('./routes/user');
const app = express();
app.use(cors());


const port = process.env.PORT;
const mongo_url = process.env.MONGODB_URI;


databaseconnect(mongo_url);
app.use(express.json());

app.use('/api/user',userRoutes);



app.listen(port,()=>{
    console.log(`server is listening to the ${port}`);
})