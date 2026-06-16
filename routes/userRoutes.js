const express = require("express");
const userRouter = express.Router();

const {
  getAllUsers,
  setPatchUsers,
  getUsersById,
  deleteUserById,
  setPostUsera,
} = require("../controller/userController");

//   Routes Users
userRouter.route("/").get(getAllUsers).post(setPostUsera);
userRouter
  .route("/:id")
  .get(getUsersById)
  .delete(deleteUserById)
  .patch(setPatchUsers);

module.exports = userRouter;
