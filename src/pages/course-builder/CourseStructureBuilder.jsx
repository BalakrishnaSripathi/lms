import { useState } from "react";
import { List, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";

import { createChapter } from "./types";
import ChapterCard from "./ChapterCard";

const CourseStructureBuilder = () => {
  const [course, setCourse] = useState({
    name: "",
    chapters: [createChapter()],
  });

  const updateChapter = (id, patch) => {
    setCourse((c) => ({
      ...c,
      chapters: c.chapters.map((ch) =>
        ch.id === id ? { ...ch, ...patch } : ch
      ),
    }));
  };

  const addChapter = () => {
    setCourse((c) => ({
      ...c,
      chapters: [...c.chapters, createChapter()],
    }));
  };

  const deleteChapter = (id) => {
    setCourse((c) => ({
      ...c,
      chapters: c.chapters.filter((ch) => ch.id !== id),
    }));
  };

  // ✅ BACKEND INTEGRATION
  const handleSave = async () => {
    if (!course.name.trim()) {
      toast.error("Course name required");
      return;
    }

    try {
      for (const chapter of course.chapters) {
        // 🔹 CREATE CHAPTER
        const chapterRes = await axios.post(
          "http://localhost:9090/api/chapter/create?staffId=SF00001",
          {
            courseId: "BD001",
            chapterNm: chapter.title,
            chapterDesc: chapter.description,
          }
        );

        const chapterId =
          chapterRes.data?.chapterId || chapterRes.data?.id;

        // 🔹 CREATE TOPICS
        await Promise.all(
          chapter.topics.map((topic) =>
            axios.post("http://localhost:9090/api/topics", {
              chapterId: chapterId,
              topicName: topic.title,
              description: topic.description,
              expectedTimeMin: parseInt(topic.duration) || 0,
              staffId: 1,

              // optional (if backend supports)
              documents: topic.documents || [],
              videos: topic.videos || [],
              urls: topic.urls || [],
            })
          )
        );
      }

      toast.success("Course saved successfully 🚀");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save course");
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
      <header className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft">
          <List className="h-6 w-6 text-[#9810FA]" />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Course Structure Builder
          </h1>
          <p className="text-sm text-muted-foreground">
            Design your course curriculum
          </p>
        </div>
      </header>

      <section className="mt-6">
        <label className="mb-2 block text-sm font-semibold">
          Course Name
        </label>

        <Input
          placeholder="Advanced Web Development"
          value={course.name}
          onChange={(e) =>
            setCourse((c) => ({ ...c, name: e.target.value }))
          }
        />
      </section>

      <hr className="my-6" />

      <section>
        <div className="mb-4 flex justify-between">
          <h2 className="font-semibold">Chapters</h2>

          <Button onClick={addChapter}>
            <Plus /> Add Chapter
          </Button>
        </div>

        <div className="space-y-4">
          {course.chapters.map((chapter, i) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              index={i}
              onChange={(patch) =>
                updateChapter(chapter.id, patch)
              }
              onDelete={() => deleteChapter(chapter.id)}
            />
          ))}
        </div>
      </section>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave}>
          <Save /> Save Course
        </Button>
      </div>
    </div>
  );
};

export default CourseStructureBuilder;