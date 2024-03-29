const express = require('express');
const Category = require('../models/CategoryModel.js');
const verifyUser = require('../middlewares/jwt.js');

const categoryRouter = express.Router();

categoryRouter.get('/', (req,res)=>{
    Category.find({})
    .then((categories)=>{
        res.status(200).json({results:categories})
    })
    .catch((err)=>{
        res.status(500).json({
            error:'not found',
            success:false
        })
    })
})
categoryRouter.get('/:id', (req,res)=>{
    Category.findById(req.params.id)
    .then((cat)=>{
        res.status(200).json(cat)
    })
    .catch((err)=>{
        res.status(500).json({
            error:'not found',
            success:false
        })
    })
})

categoryRouter.post('/', (req,res)=>{
    if(!req.body.name){
        return res.status(500).json({error:'Fill in Category name'})

    }
  /*  if(req.isAdmin !== true){
        return res.status(401).json({error:'Your not Authorized!!!'})
    }*/
    
    Category.findOne({name:req.body.name})
    .then((cat)=>{
        if(cat){
            return res.status(401).json({error:"Category Already exists"})
        }else{
            const category = new Category({
                name:req.body.name
            });
            category.save()
            .then((newCat)=>{
                res.status(201).json({message:"Category Created Successfully"})
            })
            .catch((err)=>{
                res.status(500).json({
                    error:'try again',
                    success:false
                })
            })  
        }
    }).catch(error=>{
        return res.status(500).json({error:error})
    })
    
})

categoryRouter.delete("/:id", verifyUser, (req,res)=>{
    Category.findByIdAndDelete(req.params.id)
    .then((deletedCat)=>{
        if(deletedCat){
           return res.status(200).json({
            success:true,
            message:'Category was deleted successfully'
           })
        }else{
            return res.status(404).json({
                success:false,
                message:'category not found'
            })
        }
        
    })
    .catch(err=>{
        return res.status(500).json({
            error:'try again',
            success:false
        })
    })
})
categoryRouter.put('/:id', verifyUser, (req,res)=>{
    Category.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name
        },
        {
            new:true
        }  
    )
    .then((updatedCat)=>{
        if(updatedCat){
            return res.status(200).json(updatedCat)
        }else{
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }
    })
    .catch((err)=>{
        return res.status(500).json({
            error:'try again',
            success:false
        })
    })
})


module.exports = categoryRouter
