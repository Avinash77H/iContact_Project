import UserTable from '../database/UserSchema'
import { Request , Response } from 'express'

// create user
export const createUser = async (request:Request , response:Response) => {
    const userBody = request.body;
    try{
        const user = new UserTable(userBody);
        const userData = await user.save();
        if(userData){
            return response.json({data : userData});
        }else{
            return response.status(400).send("Not Found");
        }
    }catch(err){
        response.status(400).send("Somthing Went Wrong");
    }
}

// read method
export const getUser = async(request:Request,response:Response)=>{
    try{
      const userData = await UserTable.find();
   if(userData.length === 0){
    return response.json({msg:"userData not found"})
   }else{
    return response.json({
        data:userData
      })
   }
    }catch(err){
      return  response.status(400).json({
            msg:"something went wrong"
        })
    }
}

// getUserById 
export const getUserById = async(request:Request,response:Response)=>{
    const userId = request.body._id;
    try{
        const userData = await UserTable.findById({_id:userId});
     return response.json({
            data:userData
        })
    }catch(err){
        return response.status(400).json({msg:"Something Went Wrong"});
    }
};

// deleteUserById
export const deleteUser = async(request:Request,response:Response)=>{
    const userId = request.body._id;
    console.log("userId",userId)
    try{
        await UserTable.findByIdAndDelete(userId);
       return response.json({msg:"User sucessfully deleted.."});
    }catch(err){
       return response.json({msg:"Something Went Wrong"});
    }
}

// updateUserById
export const updateUser = async(request:Request,response:Response)=>{
    const userId = request.body._id;
    const updatedData = request.body;
    try{
        await UserTable.findByIdAndUpdate({_id:userId},updatedData);
        response.json({msg:"User Updated sucessfully.."});
    }catch(err){
        response.json({msg:"Something Went Wrong"});
    }
}