import { z } from "zod";

export const submissionSchema = z.object({
  username: z.string().min(1),
  langauge: z.enum(["JavaScript", "Python", "Java", "C++"]),
  code: z.string().min(1),
  stdin: z.string().min(1),
  stdout: z.string().optional(),
});
