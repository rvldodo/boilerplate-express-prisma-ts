import { PrismaClient } from "@prisma/client";
import { prismaPostType, prismaUpdateType } from "../types/prisma.types";

type ValidationModelName = "user";

export const prisma = new PrismaClient();

class BaseDTO {
  public model: ValidationModelName;
  constructor(model: ValidationModelName) {
    this.model = model;
  }

  async create(data: prismaPostType) {
    return await prisma[this.model].create({ data });
  }

  async findById(id: string) {
    return await prisma[this.model].findUnique({
      where: { id },
    });
  }

  async update(id: string, data: prismaUpdateType) {
    return await prisma[this.model].update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await prisma[this.model].delete({
      where: { id },
    });
  }

  async findMany(take: number, skip: number) {
    return await prisma[this.model].findMany({
      take,
      skip,
    });
  }
}

export default BaseDTO;
