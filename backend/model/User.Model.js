const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
email: {type: String, required: true, unique: true},
password: {type: String, required: true},
phone:{type:String, required:true},
isAdmin: {type: Boolean, default:false},
isuser: {type: Boolean, default:false},
token: {type:String, required:false},
verified:{type:Boolean, default:false},
isBlocked:{type:Boolean, default:false},
isDeleted:{type:Boolean, default:false},
}, {
timestamps: true,
toJSON:{
virtuals: true
},
toObject:{
virtuals: true
}
})

module.exports = mongoose.model('User',UserSchema);