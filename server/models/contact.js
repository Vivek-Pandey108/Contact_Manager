import mongoose  from "mongoose";

const contactSchema= new mongoose.Schema({
    
    name: {type: String,required:true},
    email:{type:String},
    phone:{type:Number, required: true},
    message:{type:String}
},{timestamps:true});

const Contact= mongoose.model("Contact",contactSchema);

export default Contact;