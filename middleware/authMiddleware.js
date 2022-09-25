const jwt = require ('jsonwebtoken')
const User = require('../models/user.model')

const requireAuth = async (req, res, next) => {
    let token
    if(req.headers['x-access-token']) {
        try {
            token = req.headers['x-access-token']
            const decoded = jwt.verify(token, 'secret for jwt')
            req.user = await User.findById(decoded.id).select('-password')
            if(req.user){                
                req.body.userID = req.user._id.toString();
                next();
            }
            else{
                res.json({ status:'deleted', error: 'This User was deleted, you can register again'})
            }
        } catch (error) {
            res.json({ status: 401, error: 'Please, login or register first'})
        }
    }
    if(!token) {
        res.json({ status: 401, error: 'Please, login or register first'})
    }
}

const requireNotBlocked = async (req, res, next) => {
    try {
        if(!req.user.isBlocked) next();
        else res.json({ status: 'blocked', error: 'Your account was Blocked'})
    } catch (error) {
        console.log(error);
    }
}

module.exports = { requireAuth, requireNotBlocked };