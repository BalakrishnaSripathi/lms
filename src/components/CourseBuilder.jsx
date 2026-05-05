import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";

export default function CourseBuilder() {
  const [courseName, setCourseName] = useState("");
  const [chapters, setChapters] = useState([
    {
      title: "",
      description: "",
      topics: [
        {
          title: "",
          duration: "",
          description: "",
          documents: [{ title: "" }],
        },
      ],
    },
  ]);

  const addChapter = () => {
    setChapters([...chapters, { title: "", description: "", topics: [] }]);
  };

  const addTopic = (cIndex) => {
    const updated = [...chapters];
    updated[cIndex].topics.push({
      title: "",
      duration: "",
      description: "",
      documents: [],
    });
    setChapters(updated);
  };

  const addDocument = (cIndex, tIndex) => {
    const updated = [...chapters];
    updated[cIndex].topics[tIndex].documents.push({ title: "" });
    setChapters(updated);
  };

  return (
    <div className="p-6 bg-muted min-h-screen">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Course Structure Builder</CardTitle>
          <CardDescription>
            Design your course curriculum with modules, lessons, and topics
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Course Name */}
          <Input
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />

          <Separator />

          {/* Chapters */}
          {chapters.map((chapter, cIndex) => (
            <Card key={cIndex} className="border-purple-400 border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-purple-600">
                  Chapter {cIndex + 1}
                </CardTitle>
                <Trash2 className="cursor-pointer text-gray-500" />
              </CardHeader>

              <CardContent className="space-y-4">
                <Input
                  placeholder="Chapter Title"
                  value={chapter.title}
                  onChange={(e) => {
                    const updated = [...chapters];
                    updated[cIndex].title = e.target.value;
                    setChapters(updated);
                  }}
                />

                <Textarea
                  placeholder="Chapter Description"
                  value={chapter.description}
                  onChange={(e) => {
                    const updated = [...chapters];
                    updated[cIndex].description = e.target.value;
                    setChapters(updated);
                  }}
                />

                {/* Topics */}
                {chapter.topics.map((topic, tIndex) => (
                  <Card key={tIndex} className="bg-blue-50">
                    <CardHeader className="flex flex-row justify-between">
                      <CardTitle className="text-blue-600 text-sm">
                        Topic {tIndex + 1}
                      </CardTitle>
                      <Trash2 className="cursor-pointer text-gray-500" />
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Topic Title"
                          value={topic.title}
                          onChange={(e) => {
                            const updated = [...chapters];
                            updated[cIndex].topics[tIndex].title = e.target.value;
                            setChapters(updated);
                          }}
                        />

                        <Input
                          placeholder="30 mins"
                          className="w-32"
                          value={topic.duration}
                          onChange={(e) => {
                            const updated = [...chapters];
                            updated[cIndex].topics[tIndex].duration = e.target.value;
                            setChapters(updated);
                          }}
                        />
                      </div>

                      <Textarea
                        placeholder="Topic Description"
                        value={topic.description}
                        onChange={(e) => {
                          const updated = [...chapters];
                          updated[cIndex].topics[tIndex].description = e.target.value;
                          setChapters(updated);
                        }}
                      />

                      {/* Tabs */}
                      <Tabs defaultValue="documents">
                        <TabsList>
                          <TabsTrigger value="documents">Documents</TabsTrigger>
                          <TabsTrigger value="videos">Videos</TabsTrigger>
                          <TabsTrigger value="urls">URLs</TabsTrigger>
                        </TabsList>
                      </Tabs>

                      {/* Documents */}
                      {topic.documents.map((doc, dIndex) => (
                        <div key={dIndex} className="flex gap-2">
                          <Input placeholder="Document Title" />
                          <Input type="file" />
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addDocument(cIndex, tIndex)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Document
                      </Button>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  variant="secondary"
                  onClick={() => addTopic(cIndex)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Topic
                </Button>
              </CardContent>
            </Card>
          ))}

          <Button onClick={addChapter}>
            <Plus className="w-4 h-4 mr-1" />
            Add Chapter
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}