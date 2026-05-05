import { ChevronDown, FileText, GripVertical, Trash2, Video, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import ReferenceList from "./ReferenceList";

const tabs = [
  { id: "documents", label: "Documents", icon: FileText },
  { id: "videos", label: "Videos", icon: Video },
  { id: "urls", label: "URLs", icon: LinkIcon },
];

const TopicCard = ({ topic, index, onChange, onDelete }) => {
  return (
    <div className="rounded-xl border border-border bg-card/50 p-3 space-y-3">
      {/* Header Bar */}
      <div className="flex items-center gap-2">
        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
        <button 
          onClick={() => onChange({ expanded: !topic.expanded })}
          className={cn("transition-transform duration-200", !topic.expanded && "-rotate-90")}
        >
          <ChevronDown className="h-5 w-5" />
        </button>
        <span className="font-medium text-sm">Topic {index + 1}</span>

        <div className="ml-auto">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {topic.expanded && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-1">
          {/* 70-30 Split Input Row */}
          <div className="flex gap-2">
            <Input 
              className="flex-[7]" 
              placeholder={`Topic ${index + 1} Title`} 
              value={topic.title} 
              onChange={(e) => onChange({ title: e.target.value })}
            />
            <Input 
              className="flex-[3]" 
              placeholder="30 mins" 
              value={topic.duration || ""} 
              onChange={(e) => onChange({ duration: e.target.value })}
            />
          </div>

          <Textarea 
            placeholder="Topic Description" 
            value={topic.description} 
            onChange={(e) => onChange({ description: e.target.value })}
            className="min-h-[80px] bg-background"
          />

          {/* Reference Navigation (Matches image_02eade.png) */}
          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                References
              </span>
              <div className="flex w-full gap-1 rounded-full bg-muted/50 p-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = topic.activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => onChange({ activeTab: tab.id })}
                      className={cn(
                        "flex flex-1 items-center justify-center gap-2 rounded-full py-1.5 text-sm font-medium transition-all",
                        isActive 
                          ? "bg-white shadow-sm text-foreground" 
                          : "text-muted-foreground hover:bg-white/50"
                      )}
                    >
                      <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* List Content */}
            <div className="rounded-lg border border-dashed p-1">
               <ReferenceList topic={topic} onChange={onChange}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicCard;