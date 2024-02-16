/*
  Warnings:

  - You are about to drop the `Audio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `audioId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `linkId` on the `Item` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Audio";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Link";
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
    "documentId" INTEGER,
    "taskId" INTEGER NOT NULL,
    CONSTRAINT "Item_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Img" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("documentId", "h", "id", "imgId", "taskId", "videoId", "w", "x", "y") SELECT "documentId", "h", "id", "imgId", "taskId", "videoId", "w", "x", "y" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_imgId_key" ON "Item"("imgId");
CREATE UNIQUE INDEX "Item_videoId_key" ON "Item"("videoId");
CREATE UNIQUE INDEX "Item_documentId_key" ON "Item"("documentId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
