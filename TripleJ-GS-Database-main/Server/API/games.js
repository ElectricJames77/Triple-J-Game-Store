const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const { authenticationAuthorization } = require("../Middleware/authMiddleware");
const router = express.Router();

// GET All Games Endpoint (Access = Public)
router.get("/games", async (req, res) => {
  try {
    const games = await prisma.game.findMany();
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET Game by Specified Game ID (Access = Public)
router.get("/games/:id", async (req, res) => {
  try {
    const game = await prisma.game.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could Not Locate Game" });
  }
});

// EDIT Game in Database (Access = ADMIN ONLY)
router.patch(
  "/games/:id",
  authenticationAuthorization("ADMIN"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, price, description, imageUrl, genre } = req.body;
      const game = await prisma.game.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title,
          price,
          description,
          imageUrl,
          genre,
        },
      });
      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }
      res.status(200).json(game);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ADD Game to Database (Access = ADMIN ONLY)
router.post("/games", authenticationAuthorization("ADMIN"), async (req, res) => {
  try {
    const { title, price, description, imageUrl, genre } = req.body;

    // Check if a game with this title already exists
    const existingGame = await prisma.game.findUnique({
      where: {
        title,
      },
    });

    if (existingGame) {
      return res.status(400).json({ error: "Game with that title already exists" });
    }

    // If game does not exist, allow ADMIN to create game
    const game = await prisma.game.create({
      data: {
        title,
        price,
        description,
        imageUrl,
        genre,
      },
    });

    res.status(201).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// DELETE Game from Database (Access = ADMIN ONLY)
router.delete(
  "/games/:id",
  authenticationAuthorization("ADMIN"),
  async (req, res) => {
    try {
      const game = await prisma.game.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }
      res.status(200).json({ message: "Game deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
