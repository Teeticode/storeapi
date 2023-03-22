const mongoose = require("mongoose");
const User = require('./UserModel')
const Product = require('./ProductModel')
const cartSchema = new mongoose.Schema({
    products:[{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'Product'
    }],
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
        
    }
},
{
    timestamps:true
}
)


const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;