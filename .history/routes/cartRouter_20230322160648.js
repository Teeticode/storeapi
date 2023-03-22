const express = require('express')
const cartRouter = express.Router()
const Cart = require('../models/CartModel')
const Product = require('../models/ProductModel')
const verifyUser = require('../middlewares/jwt')

cartRouter.get('/products/:id',verifyUser,(req,res)=>{
    Cart.findOne({owner:req.user})
    .then((cart)=>{
        if(cart){

        }else{

        }
    }).catch(error=>{
        return res.status(500).json({error:'Something went wrong'})
    })
})
cartRouter.post('/add',verifyUser,(req,res)=>{
    if(!req.body.id){
        return res.status(404).json({error:'No item is selected'})
    }
    Cart.findOne({owner:req.user})
    .then((cart)=>{
        if(cart){
            Cart.findByIdAndUpdate(
                cart._id,
                {
                    products:req.body.id
                },
                {new:true}
            )
            .then(newCart=>{
                if(newCat){
                    return res.status(201).json({message:'Product Added To Cart'})
                }else{
                    return res.status(404).json({error:'Product not found'})
                }
            })
            .catch(error=>{
                return res.status(500).json({error:'Something Went Wrong'})
            })
        }else{
            const newCat = new Cart({
                owner:req.user,
                products:req.body.id
            })
            newCat.save()
            .then((savedCat)=>{
                if(savedCat){
                    return res.status(201).json({message:'Product Added To Cart'})
                }else{
                    return res.status(404).json({error:'Product not found'})
                }
            })
            .catch(error=>{
                return res.status(500).json({error:'Something Went Wrong'})
            })
        }
    }).catch(error=>{
        return res.status(500).json({error:'Something went wrong'})
    })
})

module.exports = cartRouter