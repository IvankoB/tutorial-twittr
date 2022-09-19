-- CreateTable
CREATE TABLE "Tweet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "posted" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Tweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "about" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Liked" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tweetId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Liked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_handle_key" ON "User"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Liked_tweetId_key" ON "Liked"("tweetId");
