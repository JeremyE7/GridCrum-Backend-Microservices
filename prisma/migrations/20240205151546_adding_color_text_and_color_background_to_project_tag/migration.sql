/*
  Warnings:

  - You are about to drop the column `color` on the `ProjectTag` table. All the data in the column will be lost.
  - Added the required column `colorBackground` to the `ProjectTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorText` to the `ProjectTag` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectTag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "colorBackground" TEXT NOT NULL,
    "colorText" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "ProjectTag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProjectTag" ("id", "name", "projectId") SELECT "id", "name", "projectId" FROM "ProjectTag";
DROP TABLE "ProjectTag";
ALTER TABLE "new_ProjectTag" RENAME TO "ProjectTag";
CREATE UNIQUE INDEX "ProjectTag_name_key" ON "ProjectTag"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
