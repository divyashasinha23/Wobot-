module.exports = (router) => {

    var User = require('../handler/index')

    //User Signup
    router.route('/signup')
    .post(User.postSignupDetails)

    //User Login
    router.route('/login')
    .post(User.postLoginDetails)

    //Fetching All User Details/List
    router.route('/getUserList')
    .get(User.getUserList)

}