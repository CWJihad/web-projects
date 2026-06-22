import express from "express";
import {
    getProfile,
    updateProfile,
    updateAvatar,
    changePassword
} from "../controllers/profile.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const profileRouter = express.Router();

// All profile routes are protected
profileRouter.use(authMiddleware);

profileRouter.get("/", getProfile);

profileRouter.put("/", updateProfile);

// PUT    /api/profile/avatar → upload avatar as base64 string
profileRouter.put("/avatar", updateAvatar);

profileRouter.put("/password", changePassword);

export default profileRouter;