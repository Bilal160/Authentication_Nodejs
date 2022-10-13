import User from '../../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const LoginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({ 'success': false, 'message': "User Not Found" })
        }
        if(!user.verified){
            return res.status(404).json({ 'success': false, 'message': "User Account Not Activated" })
        }
        const comparepass = await bcrypt.compare(req.body.password, user.password)
        if (!comparepass) {
            return res.status(401).json({ 'success': false, 'message': "Invalid Credentials" })
        }
        const data = {
            id : user.id
        }
        const token = jwt.sign(data,process.env.SECRET_TOKEN)
        const { password, ...userdata } = user._doc
        res.status(200).json({ 'success': true, ...userdata,"token" : token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 'success': false, 'message': "Server Error!!!" })
    }

}