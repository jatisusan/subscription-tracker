import { Router } from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

// get logged-in user profile
userRouter.get("/me", authorize, getUser);

// update logged-in user
userRouter.put("/me", authorize, updateUser);

// delete logged-in user
userRouter.delete("/me", authorize, deleteUser);

export default userRouter;
