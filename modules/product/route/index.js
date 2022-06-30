module.exports = (router) => {

    var Product = require('../handler/index')
    var tokenAuth = require('../../../Middleware/tokenAuth')

    //Adding Product Manually
    router.route('/addProduct')
    .post(tokenAuth, Product.addProduct)

    //Adding Product Using CSV file
    router.route('/addProductUsingCSV')
    .post(tokenAuth, Product.addProductUsingCSV)

    //Fetching All Products
    router.route('/allProductList')
    .get(Product.getAllProduct)

    //Fetching Product As per added by particular User 
    router.route('/getAllProductByUser')
    .get(tokenAuth, Product.getAllProductByUser)

}