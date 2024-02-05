-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "i" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "w" INTEGER NOT NULL,
    "h" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "boardId" INTEGER,
    "taskId" INTEGER,
    "imgId" INTEGER,
    "videoId" INTEGER,
    "audioId" INTEGER,
    "linkId" INTEGER,
    "projectId" INTEGER,
    "reminderId" INTEGER,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_reminderId_fkey" FOREIGN KEY ("reminderId") REFERENCES "Reminder" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_audioId_fkey" FOREIGN KEY ("audioId") REFERENCES "Audio" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Img" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("audioId", "boardId", "h", "i", "id", "imgId", "linkId", "projectId", "reminderId", "taskId", "typeId", "userId", "videoId", "w", "x", "y") SELECT "audioId", "boardId", "h", "i", "id", "imgId", "linkId", "projectId", "reminderId", "taskId", "typeId", "userId", "videoId", "w", "x", "y" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_boardId_key" ON "Item"("boardId");
CREATE UNIQUE INDEX "Item_taskId_key" ON "Item"("taskId");
CREATE UNIQUE INDEX "Item_imgId_key" ON "Item"("imgId");
CREATE UNIQUE INDEX "Item_videoId_key" ON "Item"("videoId");
CREATE UNIQUE INDEX "Item_audioId_key" ON "Item"("audioId");
CREATE UNIQUE INDEX "Item_linkId_key" ON "Item"("linkId");
CREATE UNIQUE INDEX "Item_projectId_key" ON "Item"("projectId");
CREATE UNIQUE INDEX "Item_reminderId_key" ON "Item"("reminderId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
