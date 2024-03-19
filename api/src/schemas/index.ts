import { z } from "zod";

export const LANGUAGES = {
  "JavaScript (Node.js 18.15.0)": 93,
  "Python (3.11.2)": 92,
  "Java (OpenJDK 13.0.1)": 91,
  "C++ (GCC 9.2.0)": 54,
} as const;

export const submissionSchema = z.object({
  username: z.string().min(5),
  language: z.enum([
    "JavaScript (Node.js 18.15.0)",
    "Python (3.11.2)",
    "Java (OpenJDK 13.0.1)",
    "C++ (GCC 9.2.0)",
  ]),
  code: z.string().min(1),
  stdin: z.string().min(0),
  stdout: z.string().optional(),
});

export const judge0Schema = z.object({
  languageId: z.nativeEnum(LANGUAGES),
  code: z.string().min(1),
  stdin: z.string().min(0),
});

export type Submission = z.infer<typeof submissionSchema>;
export type Judge0 = z.infer<typeof judge0Schema>;
