const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../modules/user/model/index')

// json web token verification step
const Auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    try {
      token = req.headers.authorization.split(' ')[1].toString();

      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decodedToken.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('not authorized user');
    }
  if (!token) {
    res.status(401);
    throw new Error('no token provided');
  }
});

module.exports = Auth;
