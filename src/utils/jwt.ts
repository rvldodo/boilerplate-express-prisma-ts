import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { UserType } from "../types/user.types";
dotenv.config();

type DecodeToken = {
  id: string;
  email: string;
};

export const jwtToken = (user: UserType) => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
  });
};

export const decodeToken = (token: string) => {
  const decode = jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  ) as DecodeToken;
  return decode;
};
