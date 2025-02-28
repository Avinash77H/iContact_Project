import { Request, Response } from "express";
// import { validationResult } from "express-validator";
import GroupsTable from "../database/GroupSchema";
import { IGroup } from "../model/IGroup";
import mongoose from "mongoose";



/**
    @usage : Get all groups
    @method : GET
    @params : no-params
    @url : http://localhost:9988/groups/
*/

export const getAllGroups = async (request: Request, response: Response) => {
  try {
    let groups: IGroup[] | undefined = await GroupsTable.find();
    if (groups) {
      return response.status(200).json(groups);
    }
  }catch(error) {
    return response.status(500).json({ msg: "Data not found" });
  }
};

/**
    @usage : create group
    @method : post
    @params : no-params
    @url : http://localhost:9988/groups
*/

export const createGroup = async (request: Request, response: Response) => {
  
  let { name } = request.body;
  let theGroup: IGroup | null | undefined = await new GroupsTable({
    name: name,
  }).save();
  if (theGroup) {
    return response.status(200).json({
      data: theGroup,
      msg: "Group is Created",
    });
  }
};


/**
    @usage : to get a group
    @method : GET
    @params : groupId
    @url : http://localhost:9988/groups/:groupId
*/

export const getGroup = async (request: Request, response: Response) => {
  let {groupId} = request.params;
  const mongoGroupID = new mongoose.Types.ObjectId(groupId);
  let theGroup: IGroup | undefined | null = await GroupsTable.findById(mongoGroupID);
  if(!theGroup){
    return response.status(404).json({
      data: null,
      error: "No Group is Found",
    })
  }
  return response.status(200).json(theGroup);
};

/**
    @usage : delete a group
    @method : DELETE
    @params : groupId
    @url : http://localhost:9988/groups/:groupId
*/

export const deleteGroup = async(request:Request,response:Response)=>{
  let {groupId} = request.params;
  const mongoGroupID = new mongoose.Types.ObjectId(groupId);
   try{
    await GroupsTable.deleteOne({_id:mongoGroupID});
    response.json({
      msg:"Group is Deleted"
    })
   }catch(err){
    response.status(404).json({
      data:null,
      err:"Group not found"
      })
   }
}