import express from "express";

import { generateAuthTokens } from "../../middleware/auth/generateAuthTokens";
import { isAuthenticated } from "../../middleware/auth/isAuthenticated";
import {
  register,
  login,
  logout,
  refreshAccessToken,
} from "../../controllers/auth/auth.controller";
const authRouter = express.Router();

//                   register acts like middileware
authRouter.post("/register", register, generateAuthTokens);
//                    login acts like middileware
authRouter.post("/login", login, generateAuthTokens);

authRouter.post("/logout", isAuthenticated, logout);

authRouter.post("/refresh", refreshAccessToken);

export default authRouter;
