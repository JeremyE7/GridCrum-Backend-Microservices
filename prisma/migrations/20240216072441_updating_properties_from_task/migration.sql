/*
  Warnings:

  - You are about to drop the column `h` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `w` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `x` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `Task` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "state" TEXT NOT NULL,
    "springId" INTEGER NOT NULL,
    CONSTRAINT "Task_springId_fkey" FOREIGN KEY ("springId") REFERENCES "Spring" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("description", "endDate", "id", "name", "springId", "startDate", "state") SELECT "description", "endDate", "id", "name", "springId", "startDate", "state" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
