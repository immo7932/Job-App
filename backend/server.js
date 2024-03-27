import app from './app.js';
import cloudinary from "cloudinary"

// cloudinary.v2.config({
//     cloud_name : process.env.CLOUDINARY_CLIENT_NAME,
//     api_key : process.env.CLOUDINARY_CLIENT_API,
//     api_secret : process.env.CLOUDINARY_CLIENT_SECRET,
// })

cloudinary.v2.config({
    cloud_name: 'ddwejtuyq',
    api_key: '512554725659624',
    api_secret: 'KbIYAR2WtvxC5h01g06wSzp0YGY'
});
app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})