import { Router, Request, Response } from "express";
import * as groupController from "../controllers/groupController";

const groupRouter: Router = Router();

/**
    @usage : Get all groups
    @method : GET
    @params : no-params
    @url : http://localhost:9999/groups/
*/

groupRouter.get("/", async (request: Request, response: Response) => {
  
  await groupController.getAllGroups(request, response);
});

export default groupRouter;
