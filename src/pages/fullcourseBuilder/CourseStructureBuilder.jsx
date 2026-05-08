import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  List,
  Plus,
  Save,
  Loader2,
} from "lucide-react";

import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ChapterCard from "./ChapterCard";
import { createChapter } from "./types";
import { courseSchema } from "./validation";

const API = "http://localhost:9090";

const STAFF_ID = "SF00001";
const REF_BY = "STAFF";
const REF_BY_ID = 1;

const CourseStructureBuilder = () => {
  const { courseId } = useParams();

  const [loading, setLoading] = useState(false);

  const [course, setCourse] = useState({
    name: "",
    chapters: [],
  });

  // ==========================================
  // FETCH CHAPTERS + TOPICS
  // ==========================================

  useEffect(() => {
    if (courseId) {
      fetchChapters();
    }
  }, [courseId]);

  const fetchChapters = async () => {
    try {
      setLoading(true);

      // ==============================
      // GET CHAPTERS
      // ==============================

      const { data: chaptersData = [] } =
        await axios.get(
          `${API}/api/course/${courseId}/chapters`
        );

      // ==============================
      // GET TOPICS
      // ==============================

      const chaptersWithTopics = await Promise.all(
        chaptersData.map(async (chapter) => {
          const { data: topics = [] } =
            await axios.get(
              `${API}/api/topics?chapterId=${chapter.id}`
            );

          return {
            id: crypto.randomUUID(),

            backendId: chapter.id,

            title: chapter.chapterNm || "",

            description:
              chapter.chapterDesc || "",

            expanded: false,

            topics: topics.map((topic) => ({
              id: crypto.randomUUID(),

              backendId: topic.id,

              title: topic.topicName || "",

              description:
                topic.description || "",

              duration:
                topic.expectedTimeMin?.toString() ||
                "",

              expanded: false,

              activeTab: "documents",

              documents:
                topic.documents || [],

              videos: topic.videos || [],

              urls: topic.urls || [],
            })),
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
    } catch (error) {
      console.error(error);

      toast.error("Failed to load course");

      setCourse({
        name: "",
        chapters: [createChapter()],
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UPDATE CHAPTER
  // ==========================================

  const updateChapter = (id, patch) => {
    setCourse((prev) => ({
      ...prev,

      chapters: prev.chapters.map((chapter) =>
        chapter.id === id
          ? { ...chapter, ...patch }
          : chapter
      ),
    }));
  };

  // ==========================================
  // ADD CHAPTER
  // ==========================================

  const addChapter = () => {
    setCourse((prev) => ({
      ...prev,

      chapters: [
        ...prev.chapters,
        createChapter(),
      ],
    }));
  };

  // ==========================================
  // DELETE CHAPTER
  // ==========================================

  const deleteChapter = async (chapter) => {
    try {
      if (chapter.backendId) {
        await axios.delete(
          `${API}/api/delete/${chapter.backendId}?staffId=${STAFF_ID}`
        );
      }

      setCourse((prev) => ({
        ...prev,

        chapters: prev.chapters.filter(
          (ch) => ch.id !== chapter.id
        ),
      }));

      toast.success("Chapter deleted");
    } catch (error) {
      console.error(error);

      toast.error("Delete failed");
    }
  };

  // ==========================================
  // DELETE TOPIC
  // ==========================================

  const deleteTopic = async (
    chapterId,
    topic
  ) => {
    try {
      if (topic.backendId) {
        await axios.delete(
          `${API}/api/topics/${topic.backendId}`
        );
      }

      setCourse((prev) => ({
        ...prev,

        chapters: prev.chapters.map(
          (chapter) =>
            chapter.id === chapterId
              ? {
                  ...chapter,

                  topics: chapter.topics.filter(
                    (t) => t.id !== topic.id
                  ),
                }
              : chapter
        ),
      }));

      toast.success("Topic deleted");
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete topic"
      );
    }
  };

  // ==========================================
  // SAVE REFERENCES
  // ==========================================

  const saveReferences = async (
    topicId,
    type,
    references = []
  ) => {
    if (!references.length) return;

    const endpointMap = {
      documents: "document",
      videos: "video",
      urls: "url",
    };

    const endpoint = endpointMap[type];

    await Promise.all(
      references.map((ref) =>
        axios.post(
          `${API}/api/topics/${topicId}/references/${endpoint}`,
          {
            refValue: ref,

            refBy: REF_BY,

            refById: REF_BY_ID,
          }
        )
      )
    );
  };

  // ==========================================
  // HANDLE SAVE
  // ==========================================

  const handleSave = async () => {
    try {
      setLoading(true);

      // ==========================
      // VALIDATION
      // ==========================

      courseSchema.parse(course);

      const updatedChapters = [];

      // ==========================
      // LOOP CHAPTERS
      // ==========================

      for (const chapter of course.chapters) {
        let chapterId =
          chapter.backendId;

        const chapterPayload = {
          courseId,

          chapterNm:
            chapter.title?.trim() || "",

          chapterDesc:
            chapter.description?.trim() ||
            "",
        };

        // ======================
        // CREATE CHAPTER
        // ======================

        if (!chapter.backendId) {
          const { data } =
            await axios.post(
              `${API}/api/chapter/create?staffId=${STAFF_ID}`,
              chapterPayload
            );

          chapterId = data?.id;
        }

        // ======================
        // UPDATE CHAPTER
        // ======================

        else {
          await axios.put(
            `${API}/api/update/${chapter.backendId}?staffId=${STAFF_ID}`,
            chapterPayload
          );
        }

        const updatedTopics = [];

        // ======================
        // LOOP TOPICS
        // ======================

        for (const topic of chapter.topics) {
          let topicId =
            topic.backendId;

          const topicPayload = {
            chapterId,

            topicName:
              topic.title?.trim() || "",

            description:
              topic.description?.trim() ||
              "",

            expectedTimeMin:
              Number(topic.duration) || 0,

            staffId: STAFF_ID,
          };

          // ==================
          // CREATE TOPIC
          // ==================

          if (!topic.backendId) {
            const { data } =
              await axios.post(
                `${API}/api/topics`,
                topicPayload
              );

            topicId = data?.id;
          }

          // ==================
          // UPDATE TOPIC
          // ==================

          else {
            await axios.put(
              `${API}/api/topics/${topic.backendId}`,
              topicPayload
            );
          }

          // ==================
          // SAVE REFERENCES
          // ==================

          await Promise.all([
            saveReferences(
              topicId,
              "documents",
              topic.documents
            ),

            saveReferences(
              topicId,
              "videos",
              topic.videos
            ),

            saveReferences(
              topicId,
              "urls",
              topic.urls
            ),
          ]);

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

      toast.success(
        "Course saved successfully 🚀"
      );
    } catch (error) {
      console.error(error);

      if (error.errors) {
        toast.error(
          error.errors[0].message
        );
      } else {
        toast.error("Save failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="mx-auto max-w-5xl rounded-3xl border bg-card p-6 shadow-sm">
      {/* ======================================
          HEADER
      ====================================== */}

      <header className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9810FA]/10">
          <List className="h-6 w-6 text-[#9810FA]" />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            Course Structure Builder
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Design chapters, topics,
            documents, videos, and
            external references.
          </p>
        </div>
      </header>

      {/* ======================================
          COURSE NAME
      ====================================== */}

      <section className="mt-6">
        <Input
          placeholder="Course Name"
          value={course.name}
          onChange={(e) =>
            setCourse((prev) => ({
              ...prev,

              name: e.target.value,
            }))
          }
        />
      </section>

      {/* ======================================
          LOADING
      ====================================== */}

      {loading && (
        <div className="mt-8 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-xl border bg-background px-4 py-2 shadow-sm">
            <Loader2 className="h-4 w-4 animate-spin text-[#9810FA]" />

            <span className="text-sm font-medium">
              Processing...
            </span>
          </div>
        </div>
      )}

      {/* ======================================
          CHAPTERS
      ====================================== */}

      <div className="mt-6 space-y-4">
        {course.chapters.map(
          (chapter, index) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              index={index}
              onChange={(patch) =>
                updateChapter(
                  chapter.id,
                  patch
                )
              }
              onDelete={() =>
                deleteChapter(chapter)
              }
              onDeleteTopic={(topic) =>
                deleteTopic(
                  chapter.id,
                  topic
                )
              }
            />
          )
        )}
      </div>

      {/* ======================================
          FOOTER
      ====================================== */}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={addChapter}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />

          Add Chapter
        </Button>

        <Button
          onClick={handleSave}
          disabled={loading}
          className="gap-2 bg-[#9810FA] hover:bg-[#7d0ed1]"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}

          Save Course
        </Button>
      </div>
    </div>
  );
};

export default CourseStructureBuilder;