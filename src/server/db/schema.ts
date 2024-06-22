// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { InferSelectModel } from "drizzle-orm";
import { pgTableCreator, serial, varchar, integer } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `testing-platform-poc_${name}`,
);

export const contests = createTable("contest", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique(),
  description: varchar("description", { length: 10000 }),
  problemDescription: varchar("problemDescription", { length: 10000 }),
  difficulty: integer("difficulty"),
});

export const levels = createTable("level", {
  id: serial("id").primaryKey(),
  index: integer("index"),
  contestId: integer("contestId").references(() => contests.id),
  // grader program file
  graderUrl: varchar("graderUrl", { length: 10000 }),
  // input file
  inputFileUrl: varchar("inputFileUrl", { length: 10000 }),
  // user submitted solutions
});

export const userSolutions = createTable("userSolution", {
  id: serial("id").primaryKey(),
  levelId: integer("levelId").references(() => levels.id),
  fileUrl: varchar("fileUrl", { length: 10000 }),
  lastScore: integer("lastScore"),
});

export type Contest = InferSelectModel<typeof contests>;
export type Level = InferSelectModel<typeof levels>;
export type UserSolution = InferSelectModel<typeof userSolutions>;
