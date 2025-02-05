const express = require("express");
const router = express.Router();
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { authenticateUser } = require("../middlewares/authMiddleware");

const JWT_SECRET = "secret";

//get userid from token
router.get("/id", authenticateUser, (req, res) => {
  res.json({ message: "User authenticated", userId: req.userId });
});

//login and create a token
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create User
router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate role
    if (!["admin", "instructor", "student"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: "User successfully created", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.json({ message: `User with id: ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Update a user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    // Validate role
    if (!["admin", "instructor", "student"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const user = await User.update(
      { name, email, password, role },
      { where: { id } }
    );

    res.json({ message: "User successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

module.exports = router;
