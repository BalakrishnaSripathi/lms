import { z } from "zod";

// export const topicSchema = z.object({
//   title: z.string().min(1, "Topic title required"),
//   duration: z.string().optional(),
//   description: z.string().optional(),
// });

// export const chapterSchema = z.object({
//   title: z.string().min(1, "Chapter title required"),
//   description: z.string().optional(),
//   topics: z.array(topicSchema).min(1, "At least one topic required"),
// });

// export const courseSchema = z.object({
//   name: z.string().min(1, "Course name required"),
//   chapters: z.array(chapterSchema).min(1),
// });