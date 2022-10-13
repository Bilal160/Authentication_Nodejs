import User from '../../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Verify_Email from '../../utils/ActivateEmail.js'
dotenv.config()
export const RegisterUser = async (req, res) => {
    if(!req.body.username || !req.body.email || !req.body.password) return res.status(404).json("Fill All Fields")
    const checkuser = await User.findOne({ email: req.body.email })
    if (checkuser) {
        return res.status(404).json("User Already Exist")
    }
    const salt = await bcrypt.genSalt(15)
    const hashpassword = await bcrypt.hash(req.body.password, salt)
    if (req.body.password !== req.body.confirmpassword) return res.status(401).json("Password not matched")
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashpassword,
            profile: req.body.profile
        })
        const data = {
            id : user._id
        }
        const token = jwt.sign(data,process.env.SECRET_TOKEN,{
            expiresIn : '5m'
        })        
        const link = `${process.env.CLIENTURL}/user/activate/${user._id}/${token}`
        await Verify_Email(user.email,"Activate Your Account",link)
        res.status(200).json("Activation Email Sent")
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error!!!")
    }
}