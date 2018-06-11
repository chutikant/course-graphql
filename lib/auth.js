const { User } = require('../models')

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization || req.query.token
    const user = await User.getUserFromToken(token)
    // console.log(user);
    // return false;
    if (user) {
      req.user = user 
    //    return {
    //         id: user._id,
    //         username: user.username
    //     }
    } 
    next()
}

module.exports = { authMiddleware }