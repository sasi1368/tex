const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  code: { type: String },  // ذخیره کد تایید
});

module.exports = mongoose.model('User', userSchema);
