import * as dotenv from "dotenv";
dotenv.config();
import app from "./src/app";
import logger from "./src/utils/logger";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let appPort = process.env.PORT;
process.argv.forEach((val, index) => {
  if (val === "-port") {
    appPort = process.argv[index + 1];
  }
});

process.env.PORT = appPort;

export default app.listen(appPort, async () => {
  logger.info("", `🚀 Server listening on port ${appPort}`);
  await prisma.$connect();
  logger.info("", `🗂️  Database connected!!!`);
});
