import { z } from "zod";

export const topicSchema = z.object({
  title: z.string().min(1, "Topic title required"),
});

export const chapterSchema = z.object({
  title: z.string().min(1, "Chapter title required"),
  topics: z.array(topicSchema),
});

export const courseSchema = z.object({
  name: z.string().min(1, "Course name required"),
  chapters: z.array(chapterSchema),
});