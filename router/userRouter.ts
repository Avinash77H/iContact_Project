import { Request,Response,Router } from 'express';
import * as groupController from '../controllers/userController'

const userRouter:Router = Router();

/**
    @usage : create user
    @method : post
    @params : no-params
    @url : http://localhost:9999/users/
*/
userRouter.post('/' , async (request:Request  , response:Response) => {
  await groupController.createUser(request , response);
})

/**
    @usage : get All user
    @method : get
    @params : no-params
    @url : http://localhost:9999/users
*/
userRouter.get('/',async(request:Request,response:Response)=>{
  await groupController.getUser(request,response);
})

/**
    @usage : get user By Id
    @method : get
    @params : id
    @url : http://localhost:9999/users
*/
userRouter.get('/id',async(request:Request,response:Response)=>{
  await groupController.getUserById(request,response);
})

/**
    @usage : delete user By Id
    @method : delete
    @params : id
    @url : http://localhost:9999/users
*/
userRouter.delete('/',async(request:Request,response:Response)=>{
  await groupController.deleteUser(request,response);
})

/**
    @usage : update user By Id
    @method : patch
    @params : id
    @url : http://localhost:9999/users
*/
userRouter.patch('/',async(request:Request,response:Response)=>{
  await groupController.updateUser(request,response);
})

export default userRouter;