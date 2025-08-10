const nodemailer = require('nodemailer')
require('dotenv').config()
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.GOOGLE_APP_EMAIL,
        pass:process.env.GOOGLE_APP_PASSWORD
    }
})

exports.sendToMail = async(to,subject,text,attachments) =>{
    await transporter.sendMail({
        from:process.env.GOOGLE_APP_USER,
        to,
        subject,
        text,
        attachments
    })
}