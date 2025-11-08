import {Router} from 'express'
import  {protect} from "../middleware/authMiddleware.js"
import {signup,login}from '../controller/usercontroller.js'

const userRouter=Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)

userRouter.get("/me", protect, (req, res) => {
  res.json({ message: "Authenticated user", userId: req.user.id });
});
export default userRouter

