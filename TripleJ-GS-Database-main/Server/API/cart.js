const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();
const { authenticationAuthorization } = require("../Middleware/authMiddleware");

// Allow User to Add a Game to their Cart
router.post(
  "/cart",
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

      // Create a Cart for the user if they don't have one
      let cart = await prisma.cart.findUnique({
        where: {
          userId: parseInt(userId),
        },
      });
      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            userId: parseInt(userId),
          },
        });
      }

      // Check if the Game is already in the User's Cart
      const existingCartItem = await prisma.gameInCart.findFirst({
        where: {
          cartId: cart.id,
          gameId,
        },
      });

      let cartItem;
      // Stops user from adding duplicates to their cart
      if (existingCartItem) {
        return res.status(400).json({ error: "Game already in cart" });
      } else {
        // Creates new cart item if game is not already in the users cart
        cartItem = await prisma.gameInCart.create({
          data: {
            cartId: cart.id,
            gameId,
          },
        });
      }
      res.status(201).json(cartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Allow User to Delete a Game from their Cart
router.delete(
  "/cart",
  authenticationAuthorization("USER", "ADMIN"),
  async (req, res) => {
    try {
      const { userId, gameId } = req.body;
      
      // Find the cart associated with the User
      const cart = await prisma.cart.findUnique({
        where: {
          userId: parseInt(userId),
        },
      });
      // Check if Cart exists
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      // Check if Game exists in Cart
      const existingCartItem = await prisma.gameInCart.findFirst({
        where: {
          cartId: cart.id,
          gameId,
        },
      });

      if (!existingCartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      // Delete the Game From Cart
      await prisma.gameInCart.delete({
        where: {
          id: existingCartItem.id,
        },
      });

      res.status(200).json({ message: "Game removed from cart" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Get All Games in the Cart for the logged in User
router.get(
  "/cart/:userId",
  authenticationAuthorization("USER", "ADMIN"),
  async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Find the User
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });

      // Find the User's Cart
      const cart = await prisma.cart.findUnique({
        where: { userId: parseInt(userId) },
      });

      // Check if User exists in database
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Check if Cart exists in database
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      // Fetch all game IDs in the users Cart
      const gameIds = await prisma.gameInCart.findMany({
        where: { cartId: cart.id }, // Find all gameInCart records associated with the cartId
        select: { gameId: true }, // Only select the gameId field from each record
      });

      // Fetch the game objects based on the game IDs
      const games = await prisma.game.findMany({
        where: {
          id: {
            in: gameIds.map((game) => game.gameId), // Filter games based on the array of gameIds
          },
        },
      });

      res.status(200).json(games);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
