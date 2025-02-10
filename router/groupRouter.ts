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
    @params : name
    @url : http://localhost:9999/groups
*/

groupRouter.post(
  "/",
  [body("name").not().isEmpty().withMessage("Name is Required")],
  async (request: Request, response: Response) => {
    console.log("post",body('name'));
    await groupController.createGroup(request, response);
  }
);

export default groupRouter;
