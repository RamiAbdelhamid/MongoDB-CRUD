const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/userController");



  /************************************************************************************************ */
  /************************************************************************************************ */



const router = express.Router();

router.post("/users", createUser);

router.get("/users", getAllUsers);

// Get user by ID
router.get("/users/:id", getUserById);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

module.exports = router;
