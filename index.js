require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Projects = require('./models/projects');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery',false);
const connectDB = async ()=> {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected ${conn.connection.host}`);
    }catch (error){
        console.log(error);
        process.exit(1);
    }
}

app.get('/', (req,res) => {
    res.send({title: 'Projects'});
});

app.get('/add-project', async (req,res)=>{
    try{
        await Projects.insertMany([
            {
                title: "QR Scanner",
                domain: "Android",
            },
            {
                title: "Portfolio",
                domain: "Web",
            }
        ]);
        res.send("Data added...");
    }catch (error){
        console.log(error);
    }
});

app.get('/projects', async (req,res) => {
    const projects = await Projects.find();
    if(projects){
        res.json(projects);
    } else {
        res.send("Something went wrong.");
    }
});

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}`);
    })
});