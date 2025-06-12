const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  phone:{type:Number,required:true},
  email:{type:String,required:true},
  password: { type: String, required: true },
  blocked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
