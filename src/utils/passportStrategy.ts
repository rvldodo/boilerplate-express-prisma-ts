import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import {
  ExtractJwt,
  Strategy as JWTStrategy,
  VerifiedCallback,
} from "passport-jwt";
import { comparePassworod } from "./bcrypt";
import UserDTO from "../repository/user.dto";
import logger from "./logger";
import ErrorHandler from "../helpers/errorHandler";
import * as dotenv from "dotenv";
dotenv.config();

const userDto = new UserDTO();

passport.use(
  "login",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email: string, password: string, done: Function) => {
      const user = await userDto.findByEmail(email);
      const verify = await comparePassworod(password, user?.password as string);
      try {
        if (!verify) throw new ErrorHandler(400, "User not valid", 400);
        return done(null, user);
      } catch (err) {
        logger.error(err);
        done(err);
      }
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET as string,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token: any, done: VerifiedCallback) => {
      try {
        if (!token || !token.user)
          throw new ErrorHandler(400, "Token invalid", 400);
        return done(null, token.user);
      } catch (err) {
        logger.error(err);
        return done(err, "");
      }
    },
  ),
);

export default passport;
