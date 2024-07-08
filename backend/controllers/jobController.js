import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import Jobs from "../models/jobs.js";


export const getAlljobs  = catchAsyncError(async(req, res, next) =>{
    const jobs = await Jobs.find({Expired : false});
    res.status(200).json({
        success : true,
        jobs,
    })
})

export const createjobs = catchAsyncError(async(req, res, next) =>{

    const {role} = req.user;
    if(role === "job sekker"){
        return next(new ErrorHandler("Job seeker cannot create jobs", 400));
    }

    const {title, description, category, country, city, location, FixedSalary, SalaryFrom, SalaryTo} = req.body;

        if(!title || !description || !category || !country || !city || !location){
            return next(new ErrorHandler("Please provide full information", 400));
        }
        if(!FixedSalary || !(!SalaryFrom && !SalaryTo)){
            return next(new ErrorHandler("Please provide Either fixed salary or ranged salary", 400));
        }

        const PostedBy = req.user._id;

        const job = await Jobs.create({
            title,
            description, 
            category, 
            country, 
            city, 
            location, 
            FixedSalary, 
            SalaryFrom, 
            SalaryTo,
            PostedBy,
        })

        res.status(200).json({
            success : true,
            message : "jobs created successfully !!",
            job,
        })

})


export const getmyjob = catchAsyncError(async(req, res, next) =>{
    const {role } = req.user;
   
    if(role === "job sekker"){
        return next(new ErrorHandler("Job seeker cannot create jobs", 400));
    }
    const myjob = await Jobs.find({PostedBy : req.user._id});
    res.status(200).json({
        success : true,
        myjob,
    })
})

export const updatejob = catchAsyncError(async(req, res, next)=>{
    const {role } = req.user;
    if(role === "job sekker"){
        return next(new ErrorHandler("Job seeker cannot create jobs", 400));
    }
    const {id} = req.params;
    let job = await Jobs.findById(id);
    if(!job){
        return next(new ErrorHandler("ooops no job found", 400));
    }

    job = await Jobs.findByIdAndUpdate(id, req.body,{
        new : true,
        runValidators : true,
        useFindAndModify : false,
    })

    res.status(200).json({
        success : true,
        job,
        message : "successfully updated",
    })
})

export const deletejob = catchAsyncError(async(req, res, next)=>{
    const {role} = req.user;
    if(role === "job sekker"){
        return next(new ErrorHandler("Job seeker cannot create jobs", 400));
    }
    const {id} = req.params;
    let job = await Jobs.findById(id);
    await job.deleteOne();
    res.status(200).json({
        success : true,
        message : "jobs deleted succesfully",
    })
})

export const getSingleJob = catchAsyncError(async (req, res, next) => {
    
    const { id } = req.params;
    try {
      const job = await Jobs.findById(id);
    //  console.log(job);
      if (!job) {
        return next(new ErrorHandler("Job not found.", 404));
      }
      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
  });