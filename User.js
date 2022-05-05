import mongoose from 'mongoose'
import findOrCreate from 'mongoose-findorcreate'
import passportLocalMongoose from 'passport-local-mongoose'

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

export default mongoose.model('User', userSchema)