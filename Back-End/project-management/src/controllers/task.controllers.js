import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { Task } from "../models/task.models.js";
import { SubTask } from "../models/subtask.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";
import mongoose from "mongoose";

const getTasks = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const tasks = await Task.find({
    project: new mongoose.Types.ObjectId(projectId),
  }).populate("assignedTo", "avatar username fullName");

  return res
    .status(201)
    .json(new ApiResponse(201, tasks, "Tasks fetched successfully"));
});

const getTaskById = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(taskId),
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "assignedTo",
        foreignField: "_id",
        as: "assignedTo",
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
      $lookup: {
        from: "subtasks",
        localField: "_id",
        foreignField: "task",
        as: "subtasks",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "createdBy",
              foreignField: "_id",
              as: "createdBy",
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
              createdBy: {
                $arrayElemAt: ["$createdBy", 0],
              },
            },
          },
        ],
      },
    },

    {
      $addFields: {
        assignedTo: {
          $arrayElemAt: ["$assignedTo", 0],
        },
      },
    },
  ]);

  if (!task || task.length === 0) {
    throw new ApiError(404, "task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task[0], "Task fetched successfully"));
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, assignedTo, status } = req.body;
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "project not found~");
  }

  const files = req.files || [];

  const attachments = files.map((file) => {
    return {
      url: `${process.env.SERVER_URL}/images/${file.originalname}`,
      mimetype: file.mimetype,
      size: file.size,
    };
  });

  const task = await Task.create({
    title,
    description,
    project: new mongoose.Types.ObjectId(projectId),
    assignedTo: assignedTo
      ? new mongoose.Types.ObjectId(assignedTo)
      : undefined,
    assignedBy: new mongoose.Types.ObjectId(req.user._id),
    status,
    attachments,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

const updateTask = asyncHandler(async (req, res) => {

  const {title, description} = req.body
  const {projectId, taskId} = req.params

  const task = await Task.findOneAndUpdate(
    {
      _id: taskId,
      project: projectId
    },
    {
      title,
      description
    },
    {new: true}
  )

  if (!task) {
    throw new ApiError(404, "Task not found or invalid project!")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, task, "Task updated successfully")
    )
  
  
});

const deleteTask = asyncHandler(async (req, res) => {
  const {projectId, taskId} = req.params

  const task = await Task.findOneAndDelete(
    {
      _id: taskId,
      project: projectId
    }
  )

  if (!task) {
    throw new ApiError(404, "Task not found or invalid project")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(204, null , "Task deleted successfully")
    )
});

const createSubTask = asyncHandler(async (req, res) => {

  const {title, isCompleted} = req.body
  const {projectId, taskId} = req.params

  const task = await Task.findOne({
    _id: taskId,
    project: projectId
  })

  if (!task) {
    throw new ApiError(404, "Task not found or invalid project!")
  }

  const subtask = await SubTask.create({
    title,
    task: new mongoose.Types.ObjectId(taskId),
    isCompleted,
    createdBy: new mongoose.Types.ObjectId(req.user._id)
  })

  return res
    .status(201)
    .json(
      new ApiResponse(201, subtask, "Subtask created successfully")
    )
  
  
});

const updateSubTask = asyncHandler(async (req, res) => {

  const {title, isCompleted} = req.body
  const {taskId, subtaskId} = req.params

  const subtask = await SubTask.findOneAndUpdate(
    {
      _id: subtaskId,
      task: taskId
    },
    {
      title,
      isCompleted
    },
    {
      new: true
    }
  )

  if (!subtask) {
    throw new ApiError(404, "Subtask not found or invalid task")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, subtask, "Subtask updated successfully")
    )
  
});

const deleteSubTask = asyncHandler(async (req, res) => {
  const {taskId, subtaskId} = req.params

  const subtask = await SubTask.findOneAndDelete(
    {
      _id: subtaskId,
      task: taskId
    }
  )

  if (!subtask) {
    throw new ApiError(404, "Subtask not found or invalid task")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(204, null, "Subtask deleted successfully")
    )
});

export {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  createSubTask,
  updateSubTask,
  deleteSubTask,
};
