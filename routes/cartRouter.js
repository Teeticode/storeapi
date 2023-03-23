const express = require('express')
const cartRouter = express.Router()
const Cart = require('../models/CartModel')
const Product = require('../models/ProductModel')
const verifyUser = require('../middlewares/jwt')

cartRouter.get('/products/:id',verifyUser,(req,res)=>{
    Cart.find({owner:req.user}).populate('name description price owner')
    .then((cart)=>{
        if(cart){
            return res.status(200).json({results:cart})
        }else{
            return res.status(404).json({error:'Cart not found'})
        }
    }).catch(error=>{
        return res.status(500).json({error:'Something went wrong'})
    })
})
cartRouter.post('/add',verifyUser,(req,res)=>{
    if(!req.body.id){
        return res.status(404).json({error:'No item is selected'})
    }
    const prods = new Array()
    prods.push(req.body.id)
    Cart.findOne({owner:req.user})
    .then((cart)=>{
    
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
                return res.status(500).json({error:error})
            })
        }
    }).catch(error=>{
        return res.status(500).json({error:error})
    })
})

module.exports = cartRouter