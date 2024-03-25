import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name : {
        type : String,
        required : [true, "please provide your name"],
        minLength : [3, "lentgh must be at least three character"],
        maxLength : [30, "lentgh must be at least thirty character"],
    },
    email : {
        type : String,
        required : true,
        validate : [validator.isEmail, "provide valid email"],
    },
    phone : {
        type : Number,
        required : true,
    },
    password : {
        type : String,
        required : true,
        minLength : [8, "provide atleast 8 character password"],
    },
    role : {
        type: String,
        required : true,
        enum : ["job sekker", "Employer"],
    },
    createdAt :{
            type : Date,
            default : Date.now,
    },
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.comparePassword = async function (enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
};

userSchema.methods.getJWTToken = function(){
    return Jwt.sign({id : this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn : process.env.JWT_EXPIRE,
    });
}

const User =  mongoose.model('user', userSchema);
export default User