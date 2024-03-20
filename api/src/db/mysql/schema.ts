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
  "JavaScript (Node.js 18.15.0)",
  "Python (3.11.2)",
  "Java (OpenJDK 13.0.1)",
  "C++ (GCC 9.2.0)",
]);

export const submissions = mysqlTable("submissions", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }).notNull(),
  language: languages.notNull(),
  code: text("code").notNull(),
  stdin: text("stdin"),
  stdout: text("stdout"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const insertSubmissionSchema = createInsertSchema(submissions);
export const selectSubmissionSchema = createSelectSchema(submissions);

export type NewSubmission = typeof submissions.$inferInsert;
