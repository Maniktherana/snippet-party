import {
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const languages = mysqlEnum("languages", [
  "Java",
  "Python",
  "JavaScript",
  "C++",
]);

export const submissions = mysqlTable("submissions", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }).notNull(),
  language: languages.notNull(),
  code: text("code").notNull(),
  stdin: text("stdin").notNull(),
  stdout: text("stdout"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const insertSubmissionSchema = createInsertSchema(submissions);
export const selectSubmissionSchema = createSelectSchema(submissions);

export type NewSubmission = typeof submissions.$inferInsert;
export type langauges = "JavaScript" | "Python" | "Java" | "C++";
