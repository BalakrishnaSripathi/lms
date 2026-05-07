import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { List, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";

import { createChapter } from "./types";
import ChapterCard from "./ChapterCard";
import { courseSchema } from "./validation";

const API = "http://localhost:9090";

const CourseStructureBuilder = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState({
    name: "",
    chapters: [],
  });

  // ==============================
  // ✅ LOAD CHAPTERS + TOPICS
  // ==============================
  useEffect(() => {
    fetchChapters();
  }, [courseId]);

  const fetchChapters = async () => {
    try {
      // ✅ GET CHAPTERS BY COURSE
      const res = await axios.get(
        `${API}/api/course/${courseId}/chapters`
      );

      const chaptersData = res.data || [];

      const chaptersWithTopics = await Promise.all(
        chaptersData.map(async (ch) => {
          const topicRes = await axios.get(
            `${API}/api/topics?chapterId=${ch.id}`
          );

          return {
            id: crypto.randomUUID(),
            backendId: ch.id,
            title: ch.chapterNm,
            description: ch.chapterDesc,
            expanded: true,
            topics:
              topicRes.data?.map((t) => ({
                id: crypto.randomUUID(),
                backendId: t.id,
                title: t.topicName,
                description: t.description,
                duration: t.expectedTimeMin?.toString() || "",
                expanded: true,
                activeTab: "documents",
                documents: t.documents || [],
                videos: t.videos || [],
                urls: t.urls || [],
              })) || [],
          };
        })
      );

      setCourse({
        name: courseId,
        chapters:
          chaptersWithTopics.length > 0
            ? chaptersWithTopics
            : [createChapter()],
      });
    } catch (e) {
      console.error(e);
      toast.error("Failed to load course");

      setCourse({
        name: "",
        chapters: [createChapter()],
      });
    }
  };

  // ==============================
  // STATE UPDATE
  // ==============================
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

  // ==============================
  // DELETE
  // ==============================
  const deleteChapter = async (chapter) => {
    try {
      if (chapter.backendId) {
        await axios.delete(
          `${API}/api/delete/${chapter.backendId}?staffId=SF00001`
        );
      }

      setCourse((c) => ({
        ...c,
        chapters: c.chapters.filter((ch) => ch.id !== chapter.id),
      }));

      toast.success("Chapter deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const deleteTopic = async (chapterId, topic) => {
    try {
      if (topic.backendId) {
        await axios.delete(`${API}/api/topics/${topic.backendId}`);
      }

      setCourse((c) => ({
        ...c,
        chapters: c.chapters.map((ch) =>
          ch.id === chapterId
            ? {
                ...ch,
                topics: ch.topics.filter((t) => t.id !== topic.id),
              }
            : ch
        ),
      }));

      toast.success("Topic deleted");
    } catch {
      toast.error("Delete topic failed");
    }
  };

  // ==============================
  // SAVE (CREATE + UPDATE)
  // ==============================
  const handleSave = async () => {
    try {
      courseSchema.parse(course);

      const updatedChapters = [];

      for (const chapter of course.chapters) {
        let chapterId = chapter.backendId;

        // ✅ CREATE CHAPTER
        if (!chapter.backendId) {
          const res = await axios.post(
            `${API}/api/chapter/create?staffId=SF00001`,
            {
              courseId: courseId,
              chapterNm: chapter.title,
              chapterDesc: chapter.description,
            }
          );
          chapterId = res.data?.id;
        } else {
          // ✅ UPDATE CHAPTER
          await axios.put(
            `${API}/api/update/${chapter.backendId}?staffId=1`,
            {
              courseId: courseId,
              chapterNm: chapter.title,
              chapterDesc: chapter.description,
            }
          );
        }

        const updatedTopics = [];

        for (const topic of chapter.topics) {
          let topicId = topic.backendId;

          if (!topic.backendId) {
            // ✅ CREATE TOPIC
            const res = await axios.post(`${API}/api/topics`, {
              chapterId,
              topicName: topic.title,
              description: topic.description,
              expectedTimeMin: parseInt(topic.duration) || 0,
              staffId: 1,
            });
            topicId = res.data?.id;
          } else {
            // ✅ UPDATE TOPIC
            await axios.put(`${API}/api/topics/${topic.backendId}`, {
              chapterId,
              topicName: topic.title,
              description: topic.description,
              expectedTimeMin: parseInt(topic.duration) || 0,
              staffId: 1,
            });
          }

          updatedTopics.push({
            ...topic,
            backendId: topicId,
          });
        }

        updatedChapters.push({
          ...chapter,
          backendId: chapterId,
          topics: updatedTopics,
        });
      }

      setCourse((prev) => ({
        ...prev,
        chapters: updatedChapters,
      }));

      toast.success("Course saved 🚀");
    } catch (err) {
      if (err.errors) {
        toast.error(err.errors[0].message);
      } else {
        console.error(err);
        toast.error("Save failed");
      }
    }
  };

  // ==============================
  // UI
  // ==============================
  return (
    <div className="mx-auto max-w-4xl rounded-3xl border bg-card p-6 shadow-sm">
      <header className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft">
          <List className="h-6 w-6 text-[#9810FA]" />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            Course Structure Builder
          </h1>
          <p className="mt-2 text-gray-600">
            Design your course curriculum with modules, lessons, and topics
          </p>
        </div>
      </header>

      <section className="mt-6">
        <Input
          placeholder="Course Name"
          value={course.name}
          onChange={(e) =>
            setCourse((c) => ({ ...c, name: e.target.value }))
          }
        />
      </section>

      {/* ✅ CHAPTERS */}
      <div className="space-y-4 mt-6">
        {course.chapters.map((chapter, i) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            index={i}
            onChange={(patch) =>
              updateChapter(chapter.id, patch)
            }
            onDelete={() => deleteChapter(chapter)}
            onDeleteTopic={(topic) =>
              deleteTopic(chapter.id, topic)
            }
          />
        ))}
      </div>

      {/* ✅ FOOTER */}
      <div className="mt-6 flex justify-between">
        <Button onClick={addChapter}>
          <Plus /> Add Chapter
        </Button>

        <Button onClick={handleSave}>
          <Save /> Save Course
        </Button>
      </div>
    </div>
  );
};

export default CourseStructureBuilder;