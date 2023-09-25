import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import ErrorHandler from "../../helpers/errorHandler";
import logger from "../../utils/logger";
import { UserType } from "../../types/user.types";
import { hashPassword } from "../../utils/bcrypt";
import { getUserByEmail } from "./user.service";

export const userValidationBody = [
  check("first_name").notEmpty().withMessage("First name is required"),
  check("last_name").notEmpty().withMessage("Last name is required"),
  check("email").notEmpty().isEmail().withMessage("Email not invalid"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must at least 6 characters"),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const hashedPassword = await hashPassword(req.body.password);
    try {
      const users: UserType = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
      };
      if (!errors.isEmpty()) {
        throw new ErrorHandler(400, `${errors.array()}`, 400);
      }

      req.user = users;
      next();
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
];

export const userValidationExisting = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const user = await getUserByEmail(req?.body?.email);

  try {
    if (user) throw new ErrorHandler(400, "Email already used", 400);

    next();
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
