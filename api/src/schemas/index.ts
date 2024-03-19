import { z } from "zod";

const LANGUAGES = {
  JavaScript: 93,
  Python: 92,
  Java: 91,
  Cpp: 54,
} as const;

export const submissionSchema = z.object({
  username: z.string().min(1),
  language: z.enum(["JavaScript", "Python", "Java", "C++"]),
  code: z.string().min(1),
  stdin: z.string().min(1),
  stdout: z.string().optional(),
});

export const judge0Schema = z.object({
  languageId: z.nativeEnum(LANGUAGES),
  sourceCode: z.string().min(1),
  stdin: z.string().min(1),
});

export type Submission = z.infer<typeof submissionSchema>;
export type Judge0 = z.infer<typeof judge0Schema>;
