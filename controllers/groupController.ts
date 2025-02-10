import { Request, Response } from "express";
// import { validationResult } from "express-validator";
import GroupsTable from "../database/GroupSchema";
import { IGroup } from "../model/IGroup";
// import mongoose from "mongoose";

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
  } catch (error: any) {
    return response.status(500).json({ msg: "Data not found" });
  }
};

/**
    @usage : create group
    @method : post
    @params : name
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
