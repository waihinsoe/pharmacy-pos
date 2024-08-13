import dotenv from "dotenv";
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

interface Config {
  port: string;
  nodeEnv: string;
  accessTokenSecret: string;
  refreshTokenSecret: string;
  cookieSecret: string;
  accessTokenLife: string;
  refreshTokenLife: string;
}

export const config: Config = {
  port: process.env.PORT || "",
  nodeEnv: process.env.NODE_ENV || "",
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "",
  cookieSecret: process.env.COOKIE_SECRET || "",
  accessTokenLife: process.env.ACCESS_TOKEN_LIFE || "",
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || "",
};
