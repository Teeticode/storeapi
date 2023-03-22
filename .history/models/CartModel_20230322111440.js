const mongoose = require("mongoose");
const User = require('./UserModel')
const Product = require('./ProductModel')
const userSchema = new mongoose.Schema({
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


//Login
userSchema.methods.matchPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}
const User = mongoose.model("User", userSchema);
module.exports = User;