// schemas/courseSchema.js
import { z } from "zod";

export const documentSchema = z.object({
  title: z.string().min(1, "Required"),
});

export const topicSchema = z.object({
  title: z.string().min(1),
  duration: z.string().optional(),
  description: z.string().optional(),
  documents: z.array(documentSchema),
});

export const chapterSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  topics: z.array(topicSchema),
});

export const courseSchema = z.object({
  courseName: z.string().min(1),
  chapters: z.array(chapterSchema),
});