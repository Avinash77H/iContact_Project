import {Request,Response,Router} from 'express'
import * as contactController from '../controllers/contactController'

const contactRouter = Router();

/**
    @usage : create contact
    @method : post
    @params : no-params
    @url : http://localhost:9999/contact
*/
contactRouter.post('/' , async (request:Request  , response:Response) => {
  await contactController.createContact(request , response);
})

/**
    @usage : get all contact
    @method : get
    @params : no-params
    @url : http://localhost:9999/contact
*/
contactRouter.get('/' , async (request:Request  , response:Response) => {
  await contactController.getAllContact(request , response);
})

/**
    @usage : get contact by id
    @method : get
    @params : contactID
    @url : http://localhost:9999/contact/:contactID
*/
contactRouter.get('/:contactId' , async (request:Request  , response:Response) => {
  await contactController.getContactByID(request , response);
})

/**
    @usage : delete contact
    @method : delete
    @params : id
    @url : http://localhost:9999/contact/:id
*/
contactRouter.delete('/:contactId' , async (request:Request  , response:Response) => {
  await contactController.deleteContactByID(request , response);
})

/**
    @usage : update contact
    @method : update
    @params : no-params
    @url : http://localhost:9999/contact
*/
contactRouter.patch('/' , async (request:Request  , response:Response) => {
  await contactController.updateContactByID(request , response);
})


export default contactRouter;