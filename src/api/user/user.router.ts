import { Router } from "express";
import controller from "./user.controller";
import loginController from "../../controller/login.controller";
import { userValidationBody, userValidationExisting } from "./user.validation";

const router = Router();

router.post(
  "/register",
  userValidationBody,
  userValidationExisting,
  controller.createAUser,
);
router.post("/login", loginController.login);

router.get("/:user_id", controller.getAUser);
router.get("/", controller.getListUsers);
router.put("/:user_id", controller.updateAUser);
router.delete("/:user_id", controller.deleteAUser);

export default router;
