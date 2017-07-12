var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});
userSchema.plugin(mongoosePaginate);


var User = mongoose.model('User', userSchema);

module.exports = User;
