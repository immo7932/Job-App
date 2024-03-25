import mongoose from "mongoose";
import { Schema } from "mongoose";

const jobsSchema = new Schema({
    title : {
        type : String,
        required : [true, "please provide job title"],
        minLength : [3, "lentgh must be at least three character"],
        maxLength : [30, "lentgh must be at least thirty character"],
    },
    description : {
        type : String,
        required : [true, "please provide job description"],
    },
    category : {
        type : String,
        required : true,
    },
    country : {
        type : String,
        required : true,
    },
    city : {
        type: String,
        required : true,
    },
    location :{
        type : String,
        required : true,
    },
    FixedSalary :{
        type : Number,
    },
    SalaryFrom:{
        type : Number,
    },
    SalaryTo:{
        type : Number,
    },
    Expired : {
        type : Boolean,
        default :false,
    },

    jobPostedOn :{
            type : Date,
            default : Date.now,
    },
    PostedBy :{
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true,
    }, 
});


const Jobs =  mongoose.model('jobs', jobsSchema);
export default Jobs