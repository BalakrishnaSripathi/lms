// components/TopicForm.jsx
import React from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function TopicForm({ form, cIndex, tIndex }) {
  const { fields, append } = useFieldArray({
    control: form.control,
    name: `chapters.${cIndex}.topics.${tIndex}.documents`,
  });

  return (
    <div className="bg-blue-50 p-4 rounded space-y-3">
      <input
        {...form.register(`chapters.${cIndex}.topics.${tIndex}.title`)}
        placeholder="Topic Title"
        className="w-full border p-2 rounded"
      />

      <input
        {...form.register(`chapters.${cIndex}.topics.${tIndex}.duration`)}
        placeholder="Duration"
        className="w-32 border p-2 rounded"
      />

      <textarea
        {...form.register(`chapters.${cIndex}.topics.${tIndex}.description`)}
        placeholder="Topic Description"
        className="w-full border p-2 rounded"
      />

      {fields.map((doc, dIndex) => (
        <input
          key={doc.id}
          {...form.register(
            `chapters.${cIndex}.topics.${tIndex}.documents.${dIndex}.title`
          )}
          placeholder="Document Title"
          className="w-full border p-2 rounded"
        />
      ))}

      <Button onClick={() => append({ title: "" })}>
        Add Document
      </Button>
    </div>
  );
}