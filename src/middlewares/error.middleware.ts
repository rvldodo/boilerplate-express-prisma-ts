import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../helpers/errorHandler";
import logger from "../utils/logger";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(error);

  if (error instanceof ErrorHandler) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      error: {
        statusCode: error.statusCode,
        message: error.message,
      },
    });
  }

  return res.status(500).json("Something went wrong");
};

export default errorHandler;
