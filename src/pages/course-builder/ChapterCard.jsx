import { ChevronDown, Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTopic } from "./types";
import TopicCard from "./TopicCard";
import { cn } from "@/lib/utils";

const ChapterCard = ({ chapter, index, onChange, onDelete }) => {
  return (

        <div className="rounded-2xl border-2 border-l-4 border-[#9810FA]/40 hover:border-[#9810FA] bg-card p-4 shadow-sm transition-all">
      
      {/* HEADER */}
      <div className="flex items-center gap-2">
        <GripVertical className="h-4 w-4" />

        {/* TOGGLE */}
        <button
          onClick={() => onChange({ expanded: !chapter.expanded })}
          className="rounded p-1 text-muted-foreground hover:bg-muted"
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              !chapter.expanded && "-rotate-90"
            )}
          />
        </button>

        <h2 className="font-semibold text-brand">
          Chapter {index + 1}
        </h2>

        {/* DELETE */}
        <div className="ml-auto">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={onDelete}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      {chapter.expanded && (
        <div className="mt-3 space-y-3">

          {/* ✅ CORRECT PLACE: Chapter inputs */}
          <Input
            placeholder={`Chapter ${index + 1} Title`}
            value={chapter.title}
            onChange={(e) =>
              onChange({ title: e.target.value })
            }
            
          />

          <Textarea
            placeholder="Chapter description"
            value={chapter.description}
            onChange={(e) =>
              onChange({ description: e.target.value })
            }
          />

          {/* TOPICS */}
          <div className="space-y-3">
            {chapter.topics.map((topic, i) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                index={i}
                onChange={(patch) =>
                  onChange({
                    topics: chapter.topics.map((t) =>
                      t.id === topic.id ? { ...t, ...patch } : t
                    ),
                  })
                }
                onDelete={() =>
                  onChange({
                    topics: chapter.topics.filter(
                      (t) => t.id !== topic.id
                    ),
                  })
                }
              />
            ))}
          </div>

          {/* ADD TOPIC */}
          <Button
            variant="outline"
            onClick={() =>
              onChange({
                topics: [...chapter.topics, createTopic()],
              })
            }
          >
            <Plus className="mr-1 h-4 w-4" /> Add Topic
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChapterCard;