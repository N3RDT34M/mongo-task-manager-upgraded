const express = require("express");

const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getAllSubTasks,
  getSubTaskById,
  createSubTask,
  updateSubTask,
  deleteSubTask,
  getAllComments,
  getCommentById,
  createComment,
  deleteComment
} = require("../controllers/TasksController.js");

// Routes for tasks
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

// Routes for subtasks
router.get("/:taskId/subtasks", getAllSubTasks); // Get all subtasks for a task
router.get("/:taskId/subtasks/:subTaskId", getSubTaskById); // Get a specific subtask
router.post("/:taskId/subtasks", createSubTask); // Create a new subtask
router.put("/:taskId/subtasks/:subTaskId", updateSubTask); // Update a subtask
router.delete("/:taskId/subtasks/:subTaskId", deleteSubTask); // Delete a subtask

// Routes for comments
router.get("/:taskId/comments", getAllComments); // Get all comments for a task
router.get("/:taskId/comments/:commentId", getCommentById); // Get a specific comment
router.post("/:taskId/comments", createComment); // Create a new comment
router.delete("/:taskId/comments/:commentId", deleteComment); // Delete a comment

module.exports = router;
