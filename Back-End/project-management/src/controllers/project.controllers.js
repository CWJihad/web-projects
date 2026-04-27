import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectMember.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";
import mongoose from "mongoose";

const getProjects = asyncHandler(async (req, res) => {
  //test

  const project = await ProjectMember.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "projects",
        localField: "projects",
        foreignField: "_id",
        as: "projects",
        pipeline: [
          {
            $lookup: {
              from: "projectmembers",
              localField: "_id",
              foreignField: "projects",
              as: "projectmembers",
            },
          },
          {
            $addFields: {
              members: {
                $size: "projectmembers",
              },
            },
          },
        ],
      },
    },
    {
      $unwind: "$projects",
    },
    {
      $project: {
        "projects._id": 1,
        "projects.name": 1,
        "projects.description": 1,
        "projects.members": 1,
        role: 1,
        _id: 0,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, project, "All projects fetched Successfully"));
});

const getProjectById = asyncHandler(async (req, res) => {
  //test
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project fetched successfully"));
});

const createProject = asyncHandler(async (req, res) => {
  //test

  const { name, description } = req.body;

  const project = await Project.create({
    name,
    description,
    createdBy: new mongoose.Types.ObjectId(req.user._id),
  });

  await ProjectMember.create({
    user: new mongoose.Types.ObjectId(req.user._id),
    project: new mongoose.Types.ObjectId(project._id),
    role: UserRolesEnum.ADMIN,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project created Successfully"));
});

const updateProject = asyncHandler(async (req, res) => {
  //test

  const { name, description } = req.body; // this two things you should to update

  const { projectId } = req.params; // which project you want to update

  const updateProject = await Project.findByIdAndUpdate(
    projectId,
    {
      name,
      description,
    },
    { new: true },
  );

  if (!updateProject) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateProject, "Project updated successfully"));
});

const deleteProject = asyncHandler(async (req, res) => {
  //test
  const { projectId } = req.params;

  const deleteProject = await Project.findByIdAndDelete(projectId);

  if (!deleteProject) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, [], "Project deleted successfully"));
});

const addMembersToProject = asyncHandler(async (req, res) => {
  //test
  const { email, role } = req.body;
  const { projectId } = req.params;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  await ProjectMember.findByIdAndUpdate(
    {
      user: new mongoose.Types.ObjectId(user._id),
      project: new mongoose.Types.ObjectId(projectId),
    },
    {
      user: new mongoose.Types.ObjectId(user._id),
      project: new mongoose.Types.ObjectId(projectId),
      role: role,
    },
    {
      new: true,
      upsert: true,
    },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Project member added successfully"));
});

const getProjectMembers = asyncHandler(async (req, res) => {
  //test
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const projectMembers = await ProjectMember.aggregate([
    {
      $match: {
        project: new mongoose.Types.ObjectId(projectId),
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              fullName: 1,
              avatar: 1,
            },
          },
        ],
      },
    },

    {
      $addFields: {
        user: {
          $arrayElemAt: ["$user", 0],
        },
      },
    },

    {
      $project: {
        project: 1,
        user: 1,
        role: 1,
        createdAt: 1,
        updatedAt: 1,
        _id: 0,
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        projectMembers,
        "Project members fetched successfully",
      ),
    );
});

const updateMemberRole = asyncHandler(async (req, res) => {
  //test
  const { projectId, userId } = req.params;
  const { newRole } = req.body;

  if (!AvailableUserRole.includes(newRole)) {
    throw new ApiError(404, "Role doesn't exist!");
  }

  const updateProjectMember = await ProjectMember.findByIdAndUpdate(
    {
      user: new mongoose.Types.ObjectId(userId),
      project: new mongoose.Types.ObjectId(projectId),
    },
    {
      role: newRole,
    },
    { new: true },
  );

  if (!updateProjectMember) {
    throw new ApiError(404, "Project member not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Project member role updated successfully"));
});

const deleteMember = asyncHandler(async (req, res) => {
  //test
  const { projectId, userId } = req.params;

  const updateProjectMember = await ProjectMember.findByIdAndDelete({
    user: new mongoose.Types.ObjectId(userId),
    project: new mongoose.Types.ObjectId(projectId),
  });

  if (!updateProjectMember) {
    throw new ApiError(404, "Project member not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Project member deleted successfully"));
});

export {
  addMembersToProject,
  createProject,
  deleteProject,
  getProjects,
  getProjectById,
  getProjectMembers,
  updateProject,
  updateMemberRole,
  deleteMember,
};
