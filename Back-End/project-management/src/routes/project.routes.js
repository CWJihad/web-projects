import { Router } from "express";
import {
  addMembersToProject,
  createProject,
  deleteProject,
  getProjects,
  getProjectById,
  getProjectMembers,
  updateProject,
  updateMemberRole,
  deleteMember,
} from "../controllers/project.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  createProjectValidator,
  addMemberToProjectValidator,
} from "../validators/index.js";
import {
  verifyJWT,
  roleBasePermission,
} from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getProjects)
  .post(createProjectValidator(), validate, createProject);

router
  .route("/:projectId")
  .get(roleBasePermission(AvailableUserRole), getProjectById)
  .put(
    roleBasePermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    createProjectValidator(),
    validate,
    updateProject,
  )
  .delete(roleBasePermission([UserRolesEnum.ADMIN]), validate, deleteProject);

router
  .route("/:projectId/members")
  .get(getProjectMembers)
  .post(
    roleBasePermission([UserRolesEnum.ADMIN]),
    addMemberToProjectValidator,
    validate,
    addMembersToProject,
  );

router
  .route("/:projectId/members/:userId")
  .put(roleBasePermission([UserRolesEnum.ADMIN]), updateMemberRole)
  .delete(roleBasePermission([UserRolesEnum.ADMIN]), deleteMember);

export default router;
