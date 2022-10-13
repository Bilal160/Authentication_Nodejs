import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        max : 3
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        max : 4
    },
    role : {
        type : Number,
        default : 0 // 0 for User & 1 for Admin
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    verified : {
        type : Boolean,
        default : false
    }
})

export default mongoose.model("User",UserSchema)