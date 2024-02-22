import express from "express";
import { register } from "../controllers/auth/register";
import { generateAuthTokens, isAuthenticated } from "../middlewares/auth";
import { login } from "../controllers/auth/login";
import { logout } from "../controllers/auth/logout";
import { refreshAccessToken } from "../controllers/auth/refreshAccessToken";
export const authRouter = express.Router();

//                   register acts like middileware
authRouter.post("/register", register, generateAuthTokens);
//                    login acts like middileware
authRouter.post("/login", login, generateAuthTokens);

authRouter.post("/logout", isAuthenticated, logout);

authRouter.post("/refresh", refreshAccessToken);
