var Product = require('../model/index')
var csv = require('csvtojson')
var Upload = require('../../../Middleware/uploadcsv');
const { response } = require('express');


//Adding Product Manually
var addProduct = async(req, res) => {

    try{
      var userId = req.user._id;
      const{name, description, quantity, price} = req.body;
      var addProduct = await Product.create({name, description, quantity, price, userId})
      if(addProduct)
      {
        res.status(201).json(addProduct)
      }
      else{
        console.log(err)
      }
    }
    catch(err)
    {
        console.log(err)
    }
}

var userresponse

//Adding Product Using CSV File
var addProductUsingCSV = async(req, res) => {

    try{
        var userId = req.user._id
        console.log(userId)
        Upload(req, res, (err => {
            if(err)
            {
                console.log(err)
                res.json(err)
            }
            else{
               csv()
                  .fromFile(req.file.path)
                  .then((response) => {
                    for(var i=0;i<response;i++)
                    {
                        userresponse = parseFloat(response[i].name)
                        response[i].name = userresponse
                        userresponse = parseFloat(response[i].description)
                        response[i].description = userresponse
                        userresponse = parseFloat(response[i].qunatity)
                        response[i].quantity = userresponse
                        userresponse = parseFloat(response[i].price)
                        response[i].price = userresponse
                    }
                    response.forEach(data => {
                        data.createdBy = userId 
                    })
                    Product.insertMany(response, (err, data) => {
                        if(err)
                        { 
                            res.status(400).json(err)
                            console.log(err)
                        }
                        else{
                            res.json(data)
                        }
                    })
                  })         

            }
        }) )
    }
    catch(err)
    {
        res.status(400).json(err)
        console.log(err)
    }
}

//Fetching All Products
var getAllProduct = async(req, res) => {

    try{
    var allProductList = await Product.find();
    if(allProductList)
    {
        res.status(200).json(allProductList)
    }
    else{
        res.status(200).json({msg: "No product found"})
        console.log("No product found")
    }
}
catch(err)
{
    res.status(400).json(err)
    console.log(err)
}
}

//Fetching Products as per added by user
var getAllProductByUser = async(req, res) => {
    
    try{
        var userId = req.user._id
        var getAllProductByUser = await Product.find({createdBy: userId});
        if(getAllProductByUser.length !== 0)
        {
            res.status(200).json(getAllProductByUser)
        }
        else{
            res.status(200).json("No product for this user")
            console.log("No Product for this user")
        }
    }
    catch(err)
    {
        res.status(400).json(err)
        console.log(err)
    }
}

module.exports = {
    addProduct,
    addProductUsingCSV,
    getAllProduct,
    getAllProductByUser
}