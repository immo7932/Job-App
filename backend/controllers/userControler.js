import isEmail from "validator/lib/isEmail.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../models/user.js";
import sendToken from "../utils/jwtToken.js";

export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body;
    if (!name || !email || !phone || !role || !password) {
        return next(new ErrorHandler("Please fill the full registration form"));
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("Email already exists"));
    }

    // Validate email format
    if (!isEmail(email)) {
        return next(new ErrorHandler("Please provide a valid email address"));
    }

    // Create the new user
    const user = await User.create({
        name,
        email,
        phone,
        role,
        password,
    });

    sendToken(user, 200, res, "user registered successfully!!")
});


export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return next(new ErrorHandler("please provide correct credentil", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid credential", 400));
    }
    const ispasswordMatched = await user.comparePassword(password);
    if (!ispasswordMatched) {
        return next(new ErrorHandler("Invalid credential", 400));
    }

    if (user.role !== role) {
        return next(new ErrorHandler("No user found in this role", 400));
    }

    sendToken(user, 200, res, "user logedin successfully");
});

export const logout = catchAsyncError(async (req, res, next) => {
    res.status(201).cookie("token", "", {
        httpOnly : true,
        expires : new Date(Date.now()),
    }).json({
        success: true,
        message: "logout successfully!!",
    })
})


export const getUser = catchAsyncError(async(req, res, next)=>{
    const user = req.user;
    res.status(200).json({
        user
    })
})


