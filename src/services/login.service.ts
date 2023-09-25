import { NextFunction, Request, Response } from "express";
import { UserType } from "../types/user.types";
import logger from "../utils/logger";
import ErrorHandler from "../helpers/errorHandler";
import { jwtToken } from "../utils/jwt";

export const loginService = async (
  req: Request,
  res: Response,
  next: NextFunction,
  user: UserType,
): Promise<void> => {
  req.login(user, { session: false }, async (err) => {
    try {
      if (err) throw new ErrorHandler(400, `${err}`, 400);
      try {
        const token = jwtToken(user);

        if (!token) throw new ErrorHandler(400, "Failed generate token", 400);
        res.json({ token });
      } catch (err) {
        logger.error(err);
        next(err);
      }
    } catch (error) {
      logger.error(error);
      next(error);
    }
  });
};
