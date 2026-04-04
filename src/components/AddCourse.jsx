import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Upload } from "lucide-react";

export default function AddCourse({ onClose }) {
  // 1. Initialize State for Text and Files
  const [formData, setFormData] = useState({
    courseId: "",
    courseTitle: "",
    description: "",
    language: "",
    skills: "",
    subject: "",
    provider: "",
    level: "",
  });

  const [files, setFiles] = useState({
    courseImage: null,
    courseVideo: null,
  });

  // 2. Handle text/select changes
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Handle File changes
  const handleFileChange = (name, file) => {
    setFiles((prev) => ({ ...prev, [name]: file }));
  };

  // 4. Handle Form Submission using FormData
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for API
    const data = new FormData();
    
    // Append text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append files
    if (files.courseImage) data.append("courseImage", files.courseImage);
    if (files.courseVideo) data.append("courseVideo", files.courseVideo);

    console.log("Submitting FormData...");

    try {
      const response = await fetch("https://your-api-endpoint.com/api/courses", {
        method: "POST",
        // Note: Do NOT set Content-Type header when sending FormData; 
        // the browser will set it automatically with the boundary string.
        body: data,
      });

      if (response.ok) {
        alert("Course added successfully! 🎉");
        if (onClose) onClose();
      } else {
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] rounded-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Add New Course</h2>
            <p className="text-gray-500 text-sm">Fill in the details to add a new course to the catalog</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="text-gray-500 w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Course ID *</label>
              <Input 
                value={formData.courseId}
                onChange={(e) => handleChange("courseId", e.target.value)}
                placeholder="e.g., CS101" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Course Title *</label>
              <Input 
                value={formData.courseTitle}
                onChange={(e) => handleChange("courseTitle", e.target.value)}
                placeholder="e.g., Intro to Java" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description *</label>
            <Textarea 
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Provide a detailed description..." 
              className="min-h-[100px]"
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Language *</label>
              <Select onValueChange={(val) => handleChange("language", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="telugu">Telugu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Skills *</label>
              <Input 
                value={formData.skills}
                onChange={(e) => handleChange("skills", e.target.value)}
                placeholder="e.g., React, Spring Boot" 
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <SelectField label="Subject" onValueChange={(v) => handleChange("subject", v)} />
            <SelectField label="Provider" onValueChange={(v) => handleChange("provider", v)} />
            <SelectField label="Level" onValueChange={(v) => handleChange("level", v)} />
          </div>

          {/* Upload Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Course Image *</label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleFileChange("courseImage", e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-xs">{files.courseImage ? files.courseImage.name : "Click to upload image"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Course Intro Video *</label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                <Input 
                  type="file" 
                  accept="video/mp4" 
                  onChange={(e) => handleFileChange("courseVideo", e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-xs">{files.courseVideo ? files.courseVideo.name : "Click to upload video"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="px-8">Add Course</Button>
          </div>

        </form>
      </div>
    </div>
  );
}

const SelectField = ({ label, onValueChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{label} *</label>
    <Select onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="it">IT & Software</SelectItem>
        <SelectItem value="business">Business</SelectItem>
        <SelectItem value="design">Design</SelectItem>
      </SelectContent>
    </Select>
  </div>
);