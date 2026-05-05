// components/ChapterForm.jsx
import React from "react";
import { useFieldArray } from "react-hook-form";
import TopicForm from "./TopicForm";
import { Button } from "@/components/ui/button";

export default function ChapterForm({ form, index }) {
  const { fields, append } = useFieldArray({
    control: form.control,
    name: `chapters.${index}.topics`,
  });

  return (
    <div className="border p-4 rounded-lg space-y-4">
      <input
        {...form.register(`chapters.${index}.title`)}
        placeholder="Chapter Title"
        className="w-full border p-2 rounded"
      />

      <textarea
        {...form.register(`chapters.${index}.description`)}
        placeholder="Chapter Description"
        className="w-full border p-2 rounded"
      />

      {fields.map((topic, tIndex) => (
        <TopicForm
          key={topic.id}
          cIndex={index}
          tIndex={tIndex}
          form={form}
        />
      ))}

      <Button onClick={() => append({ title: "", documents: [] })}>
        Add Topic
      </Button>
    </div>
  );
}