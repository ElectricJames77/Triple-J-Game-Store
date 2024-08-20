-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 'Puzzle', 'Casual', 'Sports', 'Racing', 'Platformer', 'Fighting', 'MMORPG', 'Indie', 'FPS', 'Shooter');

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "genre" "Genre" NOT NULL,
    "totalRating" INTEGER NOT NULL DEFAULT 0,
    "ratingsCount" INTEGER NOT NULL DEFAULT 0,
    "CAST(totalRating AS REAL) / ratingsCount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameInCart" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,

    CONSTRAINT "GameInCart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameInWishlist" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "wishlistId" INTEGER NOT NULL,

    CONSTRAINT "GameInWishlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_title_key" ON "Game"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_key" ON "Wishlist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GameInCart_gameId_cartId_key" ON "GameInCart"("gameId", "cartId");

-- CreateIndex
CREATE UNIQUE INDEX "GameInWishlist_gameId_wishlistId_key" ON "GameInWishlist"("gameId", "wishlistId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInCart" ADD CONSTRAINT "GameInCart_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInCart" ADD CONSTRAINT "GameInCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInWishlist" ADD CONSTRAINT "GameInWishlist_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInWishlist" ADD CONSTRAINT "GameInWishlist_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
