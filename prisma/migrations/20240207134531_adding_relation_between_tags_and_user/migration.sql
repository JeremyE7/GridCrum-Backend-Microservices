/*
  Warnings:

  - Added the required column `userId` to the `ProjectTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TaskTag` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectTag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "colorBackground" TEXT NOT NULL,
    "colorText" TEXT NOT NULL,
    "projectId" INTEGER,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "ProjectTag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ProjectTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProjectTag" ("colorBackground", "colorText", "id", "name", "projectId") SELECT "colorBackground", "colorText", "id", "name", "projectId" FROM "ProjectTag";
DROP TABLE "ProjectTag";
ALTER TABLE "new_ProjectTag" RENAME TO "ProjectTag";
CREATE UNIQUE INDEX "ProjectTag_name_key" ON "ProjectTag"("name");
CREATE TABLE "new_TaskTag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "TaskTag_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TaskTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TaskTag" ("color", "id", "name", "taskId") SELECT "color", "id", "name", "taskId" FROM "TaskTag";
DROP TABLE "TaskTag";
ALTER TABLE "new_TaskTag" RENAME TO "TaskTag";
CREATE UNIQUE INDEX "TaskTag_name_key" ON "TaskTag"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
