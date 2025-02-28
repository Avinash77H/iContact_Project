import { Request,Response,Router } from 'express';
import * as userController from '../controllers/userController'
import { body } from 'express-validator';

const userRouter:Router = Router();

/**
    @usage : create user
    @method : post
    @params : no-params
    @url : http://localhost:9999/users/register
*/
userRouter.post('/register',[
  body('username').not().isEmpty().withMessage('username is Required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isStrongPassword().withMessage('Strong password is Required')
] , async (request:Request  , response:Response) => {

  await userController.createUser(request , response);
})

/**
    @usage : get All user
    @method : get
    @params : no-params
    @url : http://localhost:9999/users
*/
userRouter.get('/',async(request:Request,response:Response)=>{
  await userController.getUser(request,response);
})

/**
    @usage : get user By Id
    @method : get
    @params : id
    @url : http://localhost:9999/users
*/
userRouter.get('/id',async(request:Request,response:Response)=>{
  await userController.getUserById(request,response);
})

/**
    @usage : delete user By Id
    @method : delete
    @params : id
    @url : http://localhost:9999/users
*/
userRouter.delete('/',async(request:Request,response:Response)=>{
  await userController.deleteUser(request,response);
})

/**
    @usage : update user By Id
    @method : patch
    @params : id
    @url : http://localhost:9999/users
*/
userRouter.patch('/',async(request:Request,response:Response)=>{
  await userController.updateUser(request,response);
})

export default userRouter;