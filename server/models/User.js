import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String, 
            required: true,
            min: 2, 
            max: 50,
        },
        firstName: {
            type: String, 
            required: true,
            min: 2, 
            max: 50,
        },
        email: {
            type: String, 
            required: true, 
            max: 50,
            unique: true,
        },
        password: {
            type: String, 
            required: true,
            min: 5, 
            
        },
        picturePath: {
            type: String, 
            default: "",
        },
        friends: {
            type: Array, 
            default: [],
        },
       location: String,
       occupation: String,
       viewedProfile: Number,
        },
        {timestamps: true } /*will give us automatic dates when its created/ updated*/  /*https://mongoosejs.com/docs/timestamps.html*/
        );

        const User = mongoose.model("User", UserSchema);
        export default User;

        /*when creating a mongoose model, we would create a mongoose schema first, then pass it into mongoose.model then pass it into user*/