import UserTable from '../database/UserSchema'
import { Request , Response } from 'express'
import { validationResult } from 'express-validator';
import { IUser } from '../model/IUser';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import gravatar from 'gravatar';

/**
    @usage : register user
    @method : post
    @params : no-params
    @url : http://localhost:9999/users/register
*/
export const registerUser = async (request:Request, response:Response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({errors:errors.array()});
    }
    try{
        // read the form data
        let {username, email, password} = request.body;
        //check if the user already exists
        const userObj = await UserTable.findOne({email:email});
        if(userObj){
            return response.status(400).json({
                error:"the user is already exists"
            })
        }
         // password encryption
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // gravtar url
    const imageUrl = gravatar.url(email,{
        size:"200",
        rating:"pg",
        default:"mm"
    })  

    // insert to db
    const newUser:IUser = {
        username:username,
        email:email,
        password: hashedPassword,
        imageUrl:imageUrl,
        isAdmin:false
    }

    const theUserObj = await new UserTable(newUser).save();
    if(theUserObj){
        return response.status(200).json({
            data: theUserObj,
            msg:  "Registration is Successful"
        });
    }
    }catch(error:any){
        return response.status(500).json({
            error:error.message
        })
    }

   
}


// login user
export const loginUser = async (request:Request, response:Response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({errors:errors.array()});
    }
    try{
        // read the form data
        let { email, password} = request.body;
        //ceck if the user already exists
        const userObj = await UserTable.findOne({email:email});
        if(!userObj){
            return response.status(400).json({
                error:"Invalid email"
            })
        }
        console.log("userObject",userObj);
        // check for password
        let isMatch:boolean = await bcryptjs.compare(password, userObj.password);
        if(!isMatch){
            return response.status(500).json({
                error:"Invalid Password"
            })
        }
        // create a token
        const secretKey : string | undefined = process.env.JWT_SECRET_KEY;
        const payload:any = {
            user:{
                id:userObj._id,
                email:userObj.email
            }
        };
        if(secretKey && payload){ 
            jwt.sign(payload,secretKey,{expiresIn:100000000},(error,encoded)=>{
                if(error) throw error;
                if(encoded){
                    return response.status(200).json({
                        data: userObj,
                        token:encoded,
                        msg:"Login is successful"
                    })
                }
             
            }
        )}
}catch(error:any){
        return response.status(500).json({
            error:error.message
        })
    }}

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