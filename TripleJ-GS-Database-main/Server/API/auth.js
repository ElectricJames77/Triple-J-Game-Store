const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { authenticationAuthorization } = require("../Middleware/authMiddleware");

// Intermediate Function for Creating User Data in Database
const insertUserIntoDB = async (username, email, hashedPassword, role) => {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
  }
};

// Route for User Registration. Takes username, password, email, and role as arguments. Hashes password upon submission, and returns created user credentials.
router.post("/register", async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const doesUserExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (doesUserExist) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = await insertUserIntoDB(username, email, hashedPassword, role);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for User Login. Takes email and password as arguments. Issues accessToken and userId upon successful login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      res.status(200).json({ accessToken, userId: user.id });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for Logged in ADMIN to view ALL USERS.
router.get("/users", authenticationAuthorization("ADMIN"), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        cart: {
          include: {
            games: true,
          },
        },
        wishlist: {
          include: {
            games: true,
          },
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for Logged in USER's & ADMIN's to view their USER details
router.get(
  "/users/:id",
  authenticationAuthorization("USER", "ADMIN"),
  async (req, res) => {
    try {
      // Get the user ID from the request object
      const userId = req.user.id;

      // Get the user ID from the URL parameter
      const requestedUserId = parseInt(req.params.id);
      
      // Check if the requested user ID matches the signed-in user ID
      if (userId !== requestedUserId) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
        include: {
          cart: {
            include: {
              games: true,
            },
          },
          wishlist: {
            include: {
              games: true,
            },
          },
        },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
module.exports = router;
