import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import Application from "../models/applications.js";
import cloudinary from "cloudinary";
import Jobs from "../models/jobs.js";


cloudinary.v2.config({
    cloud_name: 'ddwejtuyq',
    api_key: '512554725659624',
    api_secret: 'KbIYAR2WtvxC5h01g06wSzp0YGY',
    secure: true,
});



export const employergetAllApplication = catchAsyncError(
    async (req, res, next) => {
        const { role } = req.user;
        if (role === "Job Seeker") {
            return next(
                new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
            );
        }
        const { _id } = req.user;
        const applications = await Application.find({ "emploeyrID.user": _id });
        // console.log(applications)
        res.status(200).json({
            success: true,
            applications,
        });
    }
);
















export const jobseekergetAllApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandler("Employer is not allowed to see", 400));
    }

    const { _id } = req.user;
    // console.log(_id);
    const applications = await Application.find({ 'applicantID.user': _id });
    // console.log(applications)
    // console.log(applications)
    res.status(200).json({
        success: true,
        applications,
    });
});

export const jobsekerDeleteapplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "job sekker") {
        return next(new ErrorHandler("Employer is not allowed to see", 400));
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
        return next(new ErrorHandler("oops this user does not found", 400));
    }
    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "application deleted succesfully",
    });
});

export const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        // console.log("Employer role detected. Aborting...");
        return next(new ErrorHandler("Employer is not allowed to see", 400));
    }


    if (!req.files || !req.files.resume) {
        // console.log("No resume found in request files.");
        return next(new ErrorHandler("Resume is required", 400));
    }

    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(resume.mimetype)) {
        return next(new ErrorHandler("Invalid file type. Please upload a PNG file.", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath, { resource_type: "auto" });
    //  console.log(cloudinaryResponse);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
    }

    const { name, email, coverletter, phone, adress, jobId } = req.body;
    // console.log("jobId:", jobId);

    const applicantID = {
        user: req.user._id,
        role: "Job Sekker",
    };
    // console.log(applicantID);
    if (!jobId) {
        // console.log("No jobId provided.");
        return next(new ErrorHandler("Job not found!", 404));
    }

    const jobDetails = await Jobs.findById(jobId);
    /// console.log("job details", jobDetails);
    if (!jobDetails) {
        // console.log("Job not found with jobId:", jobId);
        return next(new ErrorHandler("Job not found!", 404));
    }

    const emploeyrID = {
        user: jobDetails.PostedBy,
        role: "Employer",
    };



    if (!name || !email || !coverletter || !phone || !adress || !applicantID || !emploeyrID || !resume) {
        console.log("Missing required fields in request.");
        return next(new ErrorHandler("Please fill all the details", 400));
    }

    const applications = await Application.create({
        name,
        email,
        coverletter,
        phone,
        adress,
        applicantID,
        emploeyrID,
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    res.status(200).json({
        success: true,
        message: "You have applied successfully",
        applications,
    });
});


export const handlereject = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(
            new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
        );
    }


})
