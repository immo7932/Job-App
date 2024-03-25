import mongoose from "mongoose";
import { Schema } from "mongoose";
import validator from "validator";

const applicationSchema = new Schema({
        name : {
            type : String,
            required : [true, "please provide your name"],
        },
        email : {
            type : String,
            required : true,
            validator : validator.isEmail,
        },
        coverletter : {
            type : String,

        },
        phone : {
            type : Number,
            required : true,
        },
        adress : {
            type : String,
            required: true,
        },
        resume : {
            public_id : {
                type : String,
                required : true,
            },
            url :{
                type : String,
                required : true,
            }
        },
        emploeyrID : {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User",
                required : true,
            }
        },
        role : {
            type : String,
            enum : ["job sekker"],
           // required : true,
        }

})

const Application = mongoose.model("application", applicationSchema);
export default Application;