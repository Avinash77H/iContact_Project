import {Request,Response} from 'express'
import {validationResult} from "express-validator"
import GroupsTable from "../database/GroupSchema"
import { IGroup } from '../model/IGroup'
import mongoose from 'mongoose'


export const getAllGroups = async(request:Request,response:Response)=>{
  try{
    let groups:IGroup[] | undefined = await GroupsTable.find();
    if(groups){
      return response.status(200).json(groups);
    }
  }
  catch(error:any){
    return response.status(500).json({"msg":"Data not found"});
  }
}