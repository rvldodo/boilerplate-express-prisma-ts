import UserDTO from "../../repository/user.dto";
import { prismaPostType, prismaUpdateType } from "../../types/prisma.types";
import { UserType } from "../../types/user.types";

const userDto = new UserDTO();

export const createUser = async (
  data: prismaPostType,
): Promise<UserType | null> => {
  return await userDto.create(data);
};

export const getUserById = async (id: string): Promise<UserType | null> => {
  return await userDto.findById(id);
};

export const getUserByEmail = async (
  email: string,
): Promise<UserType | null> => {
  return await userDto.findById(email);
};

export const getListUser = async (
  limit: number,
  page: number,
): Promise<UserType[] | null> => {
  return await userDto.findMany(limit, page * limit);
};

export const updateUser = async (
  id: string,
  data: prismaUpdateType,
): Promise<UserType | null> => {
  return await userDto.update(id, data);
};

export const deleteUser = async (id: string): Promise<UserType> => {
  return await userDto.delete(id);
};
