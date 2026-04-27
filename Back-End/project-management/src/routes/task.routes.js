import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  createSubTask,
  updateSubTask,
  deleteSubTask,
} from "../controllers/task.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import { createTaskValidator, createSubTaskValidator} from "../validators/index.js";
import {
  verifyJWT,
  roleBasePermission,
} from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/:projectId")
  .get(roleBasePermission(AvailableUserRole), getTasks)
  .post(roleBasePermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),createTaskValidator(), validate, createTask);

router
  .route("/:projectId/t/:taskId")
  .get(roleBasePermission(AvailableUserRole), getTaskById)
  .put(roleBasePermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),createTaskValidator(), validate, updateTask)
  .delete(roleBasePermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), validate, deleteTask)
  
router
  .route("/:projectId/t/:taskId/subtasks")
  .post(roleBasePermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),createSubTaskValidator(), validate, createSubTask);

router
  .route("/:projectId/st/:subtaskId")
  .put(roleBasePermission(AvailableUserRole),createSubTaskValidator(), validate, updateSubTask)
  .delete(roleBasePermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), validate, deleteSubTask)















export default router;
