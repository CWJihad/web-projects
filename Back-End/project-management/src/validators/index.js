// for validation
import { body } from "express-validator";
import { AvailableUserRole } from "../utils/constants.js";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("User name is required")
      .isLowercase()
      .withMessage("User name must be lowercase")
      .isLength({ min: 3 })
      .withMessage("User name at least 3 characters"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 length"),
    body("fullName").optional().trim(),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

const userChangeCurrentPasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword").notEmpty().withMessage("New password is required"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const userResetForgotPasswordValidator = () => {
  return [
    body("newPassword")
    .notEmpty()
    .withMessage("new password is required")
  ]
}

const createProjectValidator = () => {
  return [
    body("name")
    .notEmpty()
    .withMessage("Name is required"),
    body("description")
    .optional()
  ]
}

const addMemberToProjectValidator = () => {
  return [
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
    body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(AvailableUserRole)
    .withMessage("Role is invalid")
  ]
}

const createTaskValidator = () => {
  return [
    body("title")
    .notEmpty()
    .withMessage("Title is required"),
    body("description")
    .notEmpty()
    .withMessage("Description is required"),
    body("assignedTo")
    .optional(),
    body("status")
    .optional(),
  ]
}

const createSubTaskValidator = () => {
  return [
    body("title")
    .notEmpty()
    .withMessage("Title is required"),
    body("isCompleted")
    .optional()
  ]
}




export {
  userRegisterValidator,
  userLoginValidator,
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userResetForgotPasswordValidator,
  createProjectValidator,
  addMemberToProjectValidator,
  createTaskValidator,
  createSubTaskValidator
};
