import { model, Schema } from "mongoose";
import { TUser, UserStaticModel } from "./user.interface";
import bcrypt from "bcrypt";

const UserSchema = new Schema<TUser, UserStaticModel>({
    name: {
        type : String,
        required: true,
    },
    email : {
        type : String,
        required: true,
        unique: true
    }, 
    password : {
        type:String,
        required: true,
        select: 0
    },
    role : {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

UserSchema.statics.isUserExists = async function(id: string) {
    return await UserModel.findById(id);
}

UserSchema.statics.isUserExistsByEmail = async function(email: string) {
    return await UserModel.findOne({email}).select("+password");
}

UserSchema.statics.isPasswordMaatched = async function (plainTextPass, hashedPass) {
    return await bcrypt.compare(plainTextPass,hashedPass);
} 
export const UserModel = model<TUser, UserStaticModel>('User', UserSchema);
