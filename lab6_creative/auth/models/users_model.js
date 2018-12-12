var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var UserSchema = new Schema({
    username: { type: String, unique: true },
    email: String,
    color: String,
    notes: [ {
        Title: String,
        Location: String,
        Time : { type : Date, default: Date.now },
        Description: String
        } ],
    hashed_password: String
});

mongoose.model('User', UserSchema);
