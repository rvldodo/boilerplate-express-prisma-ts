import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../../helpers/errorHandler";
import {
  createUser,
  deleteUser,
  getListUser,
  getUserById,
  updateUser,
} from "./user.service";

/*
 * Register user
 * */
const createAUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userData = {
    ...req.body,
    ...req.user,
  };
  const user = await createUser(userData);

  try {
    if (!user) throw new ErrorHandler(400, "Cannot create user", 400);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const getAUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const user = await getUserById(req.params.user_id);

  try {
    if (!user) throw new ErrorHandler(404, "User not found", 404);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getListUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let limit: number = 5;
  let page: number = 0;

  if (req?.query?.limit && req?.query?.page) {
    limit = Number(req.query.limit);
    page = Number(req.query.page);
  }

  const users = await getListUser(limit, page);

  try {
    if (!users || users.length === 0)
      throw new ErrorHandler(400, "There is no users", 204);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const updateAUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const newUser = await updateUser(req.params.user_id, req.body);

  try {
    if (!newUser) throw new ErrorHandler(400, "Cannot update user", 400);

    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

const deleteAUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const deleted = await deleteUser(req.params.user_id);

  try {
    if (!deleted) throw new ErrorHandler(400, "Cannot delete user", 400);

    res.status(200).json({
      message: "User deleted",
      user: deleted,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createAUser,
  getAUser,
  getListUsers,
  updateAUser,
  deleteAUser,
};
