const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "add the user name"],
    },
    email: {
        type: String,
        required: [true , "add the user email"],
    unique: [true, "the email is alredy exist "],
    },

   password: {
        type: String,
        required: [true , "add the user password"],
    },
   },
   {
    timestamps: true,
}
   );

   module.exports= mongoose.model("User", userSchema);