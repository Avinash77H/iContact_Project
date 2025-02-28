import { Router, Request, Response } from "express";
import * as groupController from "../controllers/groupController";
import { body } from "express-validator";
 

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

/**
    @usage : create group
    @method : post
    @params : no-paramas
    @url : http://localhost:9999/groups/
*/
groupRouter.post(
  "/",
  [body("name").not().isEmpty().withMessage("Name is Required")], // express validator
  async(request: Request, response: Response) => {
    await groupController.createGroup(request, response);
  }
);

/**
    @usage : to get a group
    @method : GET
    @params : groupId
    @url : http://localhost:9999/groups/:groupId
*/
groupRouter.get("/:groupId", async (request: Request, response: Response) => {
  await groupController.getGroup(request, response);
});


/**
    @usage : delete group
    @method : DELETE
    @params : groupId
    @url : http://localhost:9999/groups/:groupId
*/

groupRouter.delete("/:groupId", async (request: Request, response: Response) => {
  await groupController.deleteGroup(request, response);
});


export default groupRouter;
