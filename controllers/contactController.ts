import {Request,Response} from 'express'
import ContactTable from '../database/ContactSchema'
import mongoose from 'mongoose';

// create contact
export const createContact = async(request:Request,response:Response)=>{
  const userData = request.body;
  try{
   const data = new ContactTable(userData);
   const createdData = await data.save();
   if(createdData){
    response.json(createdData);
   }else{
    response.status(400).json({msg:"Contact not Found"});
   }
  }catch(err){
    response.json({msg:"Somethig Went Wrong:" + err})
  }
}

// get all contact
export const getAllContact = async(request:Request,response:Response)=>{
  try{
    const data = await ContactTable.find();
    if(data.length === 0){
      response.status(404).json({msg:"Contacts not Found"});
    }else{
      response.json(data)
    }
  }catch(err){
    response.json({msg:"Somethig Went Wrong:" + err})
  }
}

// get contact by id
export const getContactByID = async(request:Request,response:Response)=>{
  let {contactId} = request.params;
  const mongoContactID = new mongoose.Types.ObjectId(contactId);
  try{
   const data = await ContactTable.findById(mongoContactID);
   response.json(data);
  }catch(err){
    response.json({msg:"Somethig Went Wrong:" + err})
  }
}

// delete contact by id
export const deleteContactByID = async(request:Request,response:Response)=>{
  const {contactId} = request.params;
  console.log("cotactId",contactId);
  const mongoContactID = new mongoose.Types.ObjectId(contactId);
  try{
    await ContactTable.findByIdAndDelete(mongoContactID);
   response.json({msg:"Contact deleted"});
  }catch(err){
    response.json({msg:"Somethig Went Wrong:" + err})
  }
}

// update contact by id
export const updateContactByID = async(request:Request,response:Response)=>{
  const userId = request.body._id;
  const updatedData = request.body;
  try{
    await ContactTable.findByIdAndUpdate(userId,updatedData);
   response.json({msg:"Contact update successful"});
  }catch(err){
    response.json({msg:"Somethig Went Wrong:" + err});
  }
}