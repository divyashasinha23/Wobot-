var mongoose = require('mongoose');
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    userName:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
})

//hashing password before saving it in Database

userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

module.exports = mongoose.model('User', userSchema);