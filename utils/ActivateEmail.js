import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const Verify_Email = async (email,subject,text)=>{
    const transport = nodemailer.createTransport({
        service : 'gmail',
        host : "smtp.gmail.com",
        port : 465,
        auth : {
            user : process.env.USERNAME_EMAIL,
            pass : process.env.USERNAME_PASSWORD
        }
    })

    const mailoptions =  {
        from :  process.env.USERNAME_EMAIL,
        to : email,
        subject,
        html : `
            <h1>Please Verify Your Email by Clickicking Button Below</h1>
            <a href=${text}>Click To Verify</a>
        `
    }
    transport.sendMail(mailoptions,(error)=>{
        if(error){
            return res.status(404).json("Email Not Sent")
        }
        return res.status(200).json("Email Sent")
    })
}

export default Verify_Email