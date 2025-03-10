import { Hono } from "hono";
import { getAllUsers, signin, signup, userProfile } from "../controller/userController";
import { authMiddleware } from "../middlewares/authentication";
export const userRouter = new Hono();

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);

userRouter.get('/users/:id', authMiddleware, userProfile);
userRouter.get('/users', authMiddleware, getAllUsers);