const User = require('../models/user.model')

module.exports.table_get = async (req, res) => {
    try{
        const resultTable = await User.find({}, 'id , name , email , lastLoginTime , registrationTime , isBlocked');
        res.json({ status: 'ok', table: resultTable})
    }catch(error){
        res.json({ status: 'error', error: 'Something went wrong with DataBase, try again'})
    }
}

module.exports.table_update = async (req, res) => {
    try{
        const { users, type, userID } = req.body;
        User.updateMany({_id: { $in: users }}, 
            (type == 'block') ? {isBlocked: true} 
            : 
            {isBlocked: false} , function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated Docs : ", docs);
            }
        });
        let statusText = type == 'block' ? 'blocked' : 'activated'
        if(users.includes(userID) && type == 'block'){
            res.json({ status: 'error', error: 'Your account was blocked'})
        }else{
            res.json({ status: 'ok' , text: 'Users are ' + statusText})
        } 
        // res.json({ status: 'ok' , text: 'Users are updated'})
    }catch(error){
        const resultTable = await User.find({}, 'id , name , email , lastLoginTime , registrationTime , isBlocked');
        res.json({ status: 'error', error: 'Something went wrong with DataBase, try again', table: resultTable})
    }
}

module.exports.table_delete = async (req, res) => {
    try{
        const { users, userID } = req.body;
        User.deleteMany({ _id: { $in: users } }).then(function(){
            console.log("Data deleted");
        }).catch(function(error){
            console.log(error); 
        });
        const table = await User.find({}, 'id , name , email , lastLoginTime , registrationTime , isBlocked');
        if(users.includes(userID)){
            res.json({ status: 'error', error: 'Your account was deleted'})
        }else{
            res.json({ status: 'ok', table: table, text: 'Users are deleted'})
        }     
    }catch(error){
        console.log(error)
        res.json({ status: 'error', error: 'Something went wrong with DataBase, try again'})
    }
}