import { db } from "@/server/db";
import { levels, userSolutions } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const fileRouter = {
  graderFileUploader: f({
    "application/javascript": {
      maxFileCount: 1,
      maxFileSize: "2MB",
    },
  })
    .middleware(async ({ req }) => {
      const contestid = req.headers.get("contestid");
      const levelid = req.headers.get("levelid");

      return { contestId: contestid, levelId: levelid };
    })
    .onUploadComplete(async ({ metadata: { levelId }, file }) => {
      if (!levelId) {
        return;
      }
      console.log("Grader file uploaded at", file.url);
      await db
        .update(levels)
        .set({
          graderUrl: file.url,
        })
        .where(eq(levels.id, Number(levelId)));

      return {};
    }),
  inputFileUploader: f({
    text: {
      maxFileCount: 1,
      maxFileSize: "2MB",
    },
  })
    .middleware(async ({ req }) => {
      const contestid = req.headers.get("contestid");
      const levelid = req.headers.get("levelid");

      return { contestId: contestid, levelId: levelid };
    })
    .onUploadComplete(async ({ metadata: { levelId }, file }) => {
      if (!levelId) {
        return;
      }
      console.log("Input file uploaded at", file.url);
      await db
        .update(levels)
        .set({
          inputFileUrl: file.url,
        })
        .where(eq(levels.id, Number(levelId)));

      return {};
    }),
  solutionsUploader: f({
    text: {
      maxFileCount: 1,
      maxFileSize: "2MB",
    },
  })
    .middleware(async ({ req }) => {
      const levelid = req.headers.get("levelid");

      return { levelId: levelid };
    })
    .onUploadComplete(async ({ metadata: { levelId }, file }) => {
      if (!levelId) {
        return;
      }
      console.log("Solution file uploaded at", file.url);

      await db
        .insert(userSolutions)
        .values({
          fileUrl: file.url,
          levelId: Number(levelId),
        })
        .returning();
    }),
} satisfies FileRouter;

export type TPFileRouter = typeof fileRouter;
