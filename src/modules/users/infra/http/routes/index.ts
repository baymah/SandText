
import express from 'express'
import { createUserController } from '../../../usecase/createUser';

const userRouter = express.Router();

userRouter.post('/',
  (req, res) =>{
     createUserController.execute(req, res)
    // console.log("createuserController()");
    }
);



export { userRouter };