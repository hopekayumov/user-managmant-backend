const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')

const User = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: [true, 'Please enter name']
        },
        email: { 
            type: String, 
            required: [true, 'Please enter email'], 
            unique: [true, 'This email is already registered'],
            lowercase: true,
            validate:  [isEmail, 'Please enter a valid email']
        },
        password: { 
            type: String, 
            required: [true, 'Please enter password']
        },
        lastLoginTime: { type : Date, default: new Date() },
        registrationTime: { type : Date, default: new Date()}, 
        isBlocked: { type: Boolean, default: false },
        quote: { type: String},
    },
    { collection: 'user-data' }
)

User.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

User.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        if(!user.isBlocked){
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                return user;
            }else{
                throw Error ('Incorrect email and password')
            } 
        }else throw Error ('user is blocked')
    }else{
        throw Error ('Incorrect email and password')
    }
}

const model = mongoose.model('user-data', User)

module.exports = model