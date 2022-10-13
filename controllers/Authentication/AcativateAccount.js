import User from '../../models/User.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const ActivateAccount = async(req,res)=>{
    const isValid =jwt.verify(req.params.token,process.env.SECRET_TOKEN)
    if(!isValid){
        return res.status(404).json("Token Expires")
    }
    const user = await User.findById({_id:req.params.id})
    if(!user){
        return res.status(404).json("Not Valid User")
    }
    try {
        await User.findByIdAndUpdate(user._id,{
            $set : {
                verified : true
            }
        })
        res.status(200).json("Account Actiavated")
    } catch (error) {
        return res.status(500).json("Server Error")
    }

}
