import express from "express";
import Contact from "../models/contact.js";
const router= express.Router();

//create contact

router.post("/", async(req,res)=>{
    try{
        const contact= new Contact(req.body);
        await contact.save();
        console.log(contact);
        res.status(201).json(contact);


    }catch(err){
        res.status(400).json({error: err.message})
    }   
});

//getContact

router.get("/",async(req,res)=>{
    const contacts = await Contact.find().sort({createdAt:-1});
    res.status(200).json(contacts);
});

//delete contact

router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});


export default router;


