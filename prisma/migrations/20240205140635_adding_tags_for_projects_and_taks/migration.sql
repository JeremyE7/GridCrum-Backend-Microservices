/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagToTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `projectId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `reminderId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Item` table. All the data in the column will be lost.
  - Made the column `boardId` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `taskId` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Type_name_key";

-- DropIndex
DROP INDEX "_ProjectToTag_B_index";

-- DropIndex
DROP INDEX "_ProjectToTag_AB_unique";

-- DropIndex
DROP INDEX "_TagToTask_B_index";

-- DropIndex
DROP INDEX "_TagToTask_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Type";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProjectToTag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_TagToTask";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ProjectTag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "ProjectTag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TaskTag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL,
    CONSTRAINT "TaskTag_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "i" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "w" INTEGER NOT NULL,
    "h" INTEGER NOT NULL,
    "boardId" INTEGER NOT NULL,
    "imgId" INTEGER,
    "videoId" INTEGER,
    "audioId" INTEGER,
    "linkId" INTEGER,
    CONSTRAINT "Item_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_audioId_fkey" FOREIGN KEY ("audioId") REFERENCES "Audio" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Img" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("audioId", "boardId", "h", "i", "id", "imgId", "linkId", "videoId", "w", "x", "y") SELECT "audioId", "boardId", "h", "i", "id", "imgId", "linkId", "videoId", "w", "x", "y" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_boardId_key" ON "Item"("boardId");
CREATE UNIQUE INDEX "Item_imgId_key" ON "Item"("imgId");
CREATE UNIQUE INDEX "Item_videoId_key" ON "Item"("videoId");
CREATE UNIQUE INDEX "Item_audioId_key" ON "Item"("audioId");
CREATE UNIQUE INDEX "Item_linkId_key" ON "Item"("linkId");
CREATE TABLE "new_Board" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "state" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL,
    CONSTRAINT "Board_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Board" ("description", "endDate", "id", "name", "startDate", "state") SELECT "description", "endDate", "id", "name", "startDate", "state" FROM "Board";
DROP TABLE "Board";
ALTER TABLE "new_Board" RENAME TO "Board";
CREATE UNIQUE INDEX "Board_taskId_key" ON "Board"("taskId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
