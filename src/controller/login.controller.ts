import { NextFunction, Request, Response } from "express";
import passport from "passport";
import ErrorHandler from "../helpers/errorHandler";
import { UserType } from "../types/user.types";
import logger from "../utils/logger";
import { loginService } from "../services/login.service";

const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("login", async (err: Error, user: UserType) => {
    try {
      if (err || !user) throw new ErrorHandler(404, "No user found", 400);

      await loginService(req, res, next, user);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  })(req, res, next);
};

export default { login };
