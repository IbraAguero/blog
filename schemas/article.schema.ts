import { z } from "zod";

export const articleSchema = z.object({
  title: z.string(),
  content: z.string(),
});
