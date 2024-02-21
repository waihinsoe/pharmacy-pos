import express from "express";
import { register } from "../controllers/auth/register";
import { generateAuthTokens } from "../middlewares/auth";
export const authRouter = express.Router();

//                   register act like middile
authRouter.post("/register", register, generateAuthTokens);
