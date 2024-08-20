const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();
const { authenticationAuthorization } = require("../Middleware/authMiddleware");

// Allow User to Add a Game to their Wishlist
router.post(
  "/wishlist",
  authenticationAuthorization("USER", "ADMIN"),
  async (req, res) => {
    try {
      const { gameId, userId } = req.body;
      // Check if the User Exists
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      // Check if the Game Exists
      const game = await prisma.game.findUnique({
        where: {
          id: gameId,
        },
      });

      if (!user || !game) {
        return res.status(404).json({ error: "User or game not found" });
      }

      // Create a Wishlist for the User if They Don't Have One
      let wishlist = await prisma.wishlist.findUnique({
        where: {
          userId: parseInt(userId),
        },
      });
      if (!wishlist) {
        wishlist = await prisma.wishlist.create({
          data: {
            userId: parseInt(userId),
          },
        });
      }

      // Check if Game is Already on User's Wishlist
      const existingWishlistItem = await prisma.gameInWishlist.findFirst({
        where: {
          wishlistId: wishlist.id,
          gameId,
        },
      });

      let wishlistItem;
      // Stops user from adding duplicates to their wishlist
      if (existingWishlistItem) {
        return res.status(400).json({ error: "Game already on wishlist" });
      } else {
        // Creates new wishlist item if game is not already on the users wishlist
        wishlistItem = await prisma.gameInWishlist.create({
          data: {
            wishlistId: wishlist.id,
            gameId,
          },
        });
      }
      res.status(201).json(wishlistItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Allow User to View Their Current Wishlist
router.get(
  "/wishlist/:userId",
  authenticationAuthorization("USER", "ADMIN"),
  async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });

      // Check if User exists in database
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Fetch all Wishlist Items
      const wishlistItems = await prisma.wishlist.findMany({
        where: { userId: parseInt(userId) },
        include: { games: true }, //Include game details
      });

      res.status(200).json(wishlistItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Allow User to Delete a Game from their Wishlist
router.delete(
  "/wishlist",
  authenticationAuthorization("USER", "ADMIN"),
  async (req, res) => {
    try {
      const { userId, gameId } = req.body;

      // Find Wishlist associated with User
      const wishlist = await prisma.wishlist.findUnique({
        where: {
          userId: parseInt(userId),
        },
      });
      // Check if Wishlist exists
      if (!wishlist) {
        return res.status(404).json({ error: "Wishlist not found" });
      }

      // Check if Game exists in Wishlist
      const existingWishlistItem = await prisma.gameInWishlist.findFirst({
        where: {
          wishlistId: wishlist.id,
          gameId,
        },
      });

      if (!existingWishlistItem) {
        return res.status(404).json({ error: "Wishlist item not found" });
      }
      // Delete the Game From Wishlist
      await prisma.gameInWishlist.delete({
        where: {
          id: existingWishlistItem.id,
        },
      });

      res.status(200).json({ message: "Game removed from wishlist" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
