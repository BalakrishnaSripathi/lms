// pages/CourseBuilder.jsx
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema } from "@/components/courseSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChapterForm from "@/components/ChapterForm";

export default function CourseBuilder() {
  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseName: "",
      chapters: [],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "chapters",
  });

  const onSubmit = (data) => {
    console.log("FINAL DATA:", data);
    // 👉 call API here
  };

  return (
    <div className="p-6 bg-muted min-h-screen">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Course Structure Builder</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <input
            {...form.register("courseName")}
            placeholder="Course Name"
            className="w-full border p-2 rounded"
          />

          {fields.map((chapter, index) => (
            <ChapterForm
              key={chapter.id}
              index={index}
              form={form}
            />
          ))}

          <Button
            onClick={() =>
              append({ title: "", description: "", topics: [] })
            }
          >
            Add Chapter
          </Button>

          <Button onClick={form.handleSubmit(onSubmit)}>
            Save Course
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}