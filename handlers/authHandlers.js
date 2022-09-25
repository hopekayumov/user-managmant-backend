const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const createToken = (id, email) => {
    return jwt.sign({ id, email }, 'secret for jwt');
}
const handleErrors = (err) => {
    return err.message;
}

module.exports.register_post = async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        const resultTable = await User.find({}, 'id , name , email , lastLoginTime , registrationTime , isBlocked');
        const token = createToken(user._id, user.email)
        res.json({ status: 'ok', token : token, name: user.name, table: resultTable });
    } catch (err) {
        res.json({ status: 'error', error: 'This email is already registred, try to log in'})
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password)
        user.updateOne({lastLoginTime: new Date() }, (err) => {
            if (err){
                console.log(err)
            }
        });
        const token = createToken(user._id, user.email)
        res.json({ status: 'ok', token : token, name: user.name });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}
