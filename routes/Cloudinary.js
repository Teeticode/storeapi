const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const cloudinary = require('cloudinary').v2

const routerCloudinary = express.Router()

routerCloudinary.post('/image',(req,res)=>{
    console.log(req.file)
    
    cloudinary.uploader.upload(req.body.image, {resource_type:"image",use_filename:true,unique_filename:false})
    .then(result=>{console.log(result)})
    .catch(error => console.log(error))
})

module.exports = routerCloudinary