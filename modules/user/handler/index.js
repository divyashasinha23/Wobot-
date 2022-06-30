const User = require('../model/index')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


//creating JWT token
const maxAge = 1 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {
    expiresIn: maxAge,
    });
};

//User Signup

var postSignupDetails = async(req, res) => {

    try{
        const{firstName, lastName, password,userName } = req.body;
        var userDetails = await User.create({firstName, lastName, password,userName });
        if(userDetails)
        {
            
            res.status(200).json({
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                userName: userDetails.userName,
                
            })
        }
        else{
            res.status(400).json({msg: "User not created"})
            console.log("error occured")
        }
    }
    catch(err)
    {
        res.status(200).json(err)
        console.log(err)
    }
}


//User Login
var postLoginDetails = async(req, res) => {

    const{userName, password} = req.body;
    try{
        var user = await User.findOne({userName});
        if(user)
        {
            const token = createToken(user._id)
            const auth = await bcrypt.compare(password, user.password);
            
            if(!auth)
            {
                res.status(400);
                res.json("incorrect password");
            }
            else{
             res.status(200).json({
                data: user,
                token: token
             })
            
            }
        }         
        else{
            res.status(400);
            res.json("incorrect username")
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(400).json(err);
    }

}


//Fetching All User List/Details
var getUserList = async(req, res) => {

    try{
      var userList = await User.find()
    
      if(userList)
      {
        var list = userList.map(item => 
            ({
                firstName: item.firstName,
                lastName: item.lastName,
                userName: item.userName
            }))
        res.status(200).json(list)
      }
      else{
        res.status(400).json({msg: "No user found"})
        console.log("some error occured")
      }
    }
    catch(err)
    {
        res.status(400).json(err)
        console.log(err)
    }
}

module.exports = {
    postSignupDetails,
    postLoginDetails,
    getUserList
}