/*
  Warnings:

  - You are about to drop the `Board` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `boardId` on the `Item` table. All the data in the column will be lost.
  - Added the required column `taskId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Board_taskId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Board";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "w" INTEGER NOT NULL,
    "h" INTEGER NOT NULL,
    "imgId" INTEGER,
    "videoId" INTEGER,
    "audioId" INTEGER,
    "linkId" INTEGER,
    "documentId" INTEGER,
    "taskId" INTEGER NOT NULL,
    CONSTRAINT "Item_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_audioId_fkey" FOREIGN KEY ("audioId") REFERENCES "Audio" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Img" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("audioId", "documentId", "h", "id", "imgId", "linkId", "videoId", "w", "x", "y") SELECT "audioId", "documentId", "h", "id", "imgId", "linkId", "videoId", "w", "x", "y" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_imgId_key" ON "Item"("imgId");
CREATE UNIQUE INDEX "Item_videoId_key" ON "Item"("videoId");
CREATE UNIQUE INDEX "Item_audioId_key" ON "Item"("audioId");
CREATE UNIQUE INDEX "Item_linkId_key" ON "Item"("linkId");
CREATE UNIQUE INDEX "Item_documentId_key" ON "Item"("documentId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
