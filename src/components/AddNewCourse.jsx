import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload, Image as ImageIcon, BookOpen } from "lucide-react";

// Assuming you have these UI components, but standard HTML elements 
// are used below for maximum compatibility if you don't.
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  coursetitle: z.string().min(1, "Course title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  language: z.string().min(1, "Language is required"),
  skills: z.string().min(1, "Skills are required"),
  subject: z.string().min(1, "Subject is required"),
  provider: z.string().min(1, "Provider is required"),
  level: z.string().min(1, "Level is required"),
  courseImage: z.any().refine((file) => file?.length === 1, "Course image is required"),
  courseVideo: z.any().refine((file) => file?.length === 1, "Course video is required"),
});

const AddNewCourse = () => {
  const navigate= useNavigate();
  const [previews, setPreviews] = useState({ imgName: "", vidName: "" });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    const fetchCourseId = async () => {
      try {
        const res = await fetch("http://localhost:9090/api/course/view-courses");
        const data = await res.json();
        let nextId = "BD001";
        if (data.length > 0) {
          const lastId = data[data.length - 1].courseId;
          const num = parseInt(lastId.replace(/\D/g, ""));
          nextId = `BD${String(num + 1).padStart(3, "0")}`;
        }
        setValue("courseId", nextId);
      } catch (err) {
        console.log(err);
        setValue("courseId", "BD001");
      }
    };
    fetchCourseId();
  }, [setValue]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onSubmit = async (data) => {
    try {
      const imageFile = data.courseImage[0];
      const videoFile = data.courseVideo[0];
      const imageBase64 = await toBase64(imageFile);
      const videoBase64 = await toBase64(videoFile);

      const payload = {
        courseTitle: data.coursetitle,
        description: data.description,
        language: data.language,
        skills: data.skills.split(",").map((s) => s.trim()),
        subjectId: Number(data.subject),
        providerId: Number(data.provider),
        level: data.level.toUpperCase(),
        courseImage: imageFile,
        introVideo: videoBase64,
      };

      const response = await fetch(
        "http://localhost:9090/api/course/create?staffId=2",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed");
      alert("Course created ✅");
      reset();
      setPreviews({ imgName: "", vidName: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50/50 p-4 font-sans">
      <Card className="w-full max-w-[850px] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Header Section */}
        <CardHeader className="flex flex-row items-start justify-between p-8 pb-4">
          <div className="flex gap-4 items-start">
            <BookOpen className="w-8 h-8 text-blue-600 mt-1" strokeWidth={1.5} />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
                Add New Course
              </h2>
              <p className="text-[15px] text-gray-500 mt-1">
                Fill in the details to add a new course to the catalog
              </p>
            </div>
          </div>
          <button onClick={()=>navigate("/")} className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors">
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </CardHeader>

        <CardContent className="p-8 pt-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Row 1: Course ID */}
            <div className="space-y-2">
              <label className="text-[15px] font-medium text-gray-900">Course ID *</label>
              <input
                {...register("courseId")}
                readOnly
                className="w-full h-[46px] px-4 rounded-[8px] bg-[#F5F5F7] border-none focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-700 transition-all placeholder:text-gray-400"
                placeholder="e.g., CS101"
              />
              {errors.courseId && <p className="text-red-500 text-xs mt-1">{errors.courseId.message}</p>}
            </div>

            {/* Row 2: Course Title */}
            <div className="space-y-2">
              <label className="text-[15px] font-medium text-gray-900">Course Title *</label>
              <input
                {...register("coursetitle")}
                className="w-full h-[46px] px-4 rounded-[8px] bg-[#F5F5F7] border-none focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-gray-400"
                placeholder="e.g., Introduction to Computer Science"
              />
              {errors.coursetitle && <p className="text-red-500 text-xs mt-1">{errors.coursetitle.message}</p>}
            </div>

            {/* Row 3: Description */}
            <div className="space-y-2">
              <label className="text-[15px] font-medium text-gray-900">Description *</label>
              <textarea
                {...register("description")}
                className="w-full h-[100px] p-4 rounded-[8px] bg-[#F5F5F7] border-none focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none placeholder:text-gray-400"
                placeholder="Provide a detailed description of the course..."
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>

            {/* Row 4: Language & Skills (2 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[15px] font-medium text-gray-900">Language *</label>
                <select 
                  {...register("language")} 
                  className="w-full h-[46px] px-4 rounded-[8px] bg-[#F5F5F7] border-none focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-600 appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[position:calc(100%-12px)_center] bg-no-repeat"
                >
                  <option value="" disabled>Select language</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                </select>
                {errors.language && <p className="text-red-500 text-xs mt-1">{errors.language.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[15px] font-medium text-gray-900">Skills *</label>
                <input
                  {...register("skills")}
                  className="w-full h-[46px] px-4 rounded-[8px] bg-[#F5F5F7] border-none focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-gray-400"
                  placeholder="e.g., Python, Machine Learning"
                />
                {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills.message}</p>}
              </div>
            </div>

            {/* Row 5: Subject, Provider, Level (3 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[15px] font-medium text-gray-900">Subject *</label>
                <select 
                  {...register("subject")} 
                  className="w-full h-[46px] px-4 rounded-[8px] bg-[#F5F5F7] border-none focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-600 appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[position:calc(100%-12px)_center] bg-no-repeat"
                >
                  <option value="" disabled>Select subject</option>
                  <option value="1">Computer Science</option>
                  <option value="2">Data Science</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-[15px] font-medium text-gray-900">Provider *</label>
                <select 
                  {...register("provider")} 
                  className="w-full h-[46px] px-4 rounded-[8px] bg-[#F5F5F7] border-none focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-600 appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[position:calc(100%-12px)_center] bg-no-repeat"
                >
                  <option value="" disabled>Select provider</option>
                  <option value="1">Internal</option>
                  <option value="2">External</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[15px] font-medium text-gray-900">Level *</label>
                <select 
                  {...register("level")} 
                  className="w-full h-[46px] px-4 rounded-[8px] bg-[#F5F5F7] border-none focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-600 appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[position:calc(100%-12px)_center] bg-no-repeat"
                >
                  <option value="" disabled>Select level</option>
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                </select>
              </div>
            </div>

            {/* Row 6: File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-[15px] font-medium text-gray-900">Course Image *</label>
                <div className="relative h-[160px] border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center hover:border-blue-400 transition-all cursor-pointer bg-white group">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("courseImage")}
                    onChange={(e) => setPreviews(prev => ({ ...prev, imgName: e.target.files[0]?.name }))}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <ImageIcon className="w-10 h-10 text-gray-400 mb-3 group-hover:text-blue-500 transition-colors" strokeWidth={1.5} />
                  <p className="text-[15px] text-slate-700 mb-1">
                    {previews.imgName ? <span className="text-blue-600">{previews.imgName}</span> : "Click to upload course image"}
                  </p>
                  <p className="text-[13px] text-gray-500">PNG, JPG up to 10MB</p>
                </div>
                {errors.courseImage && <p className="text-red-500 text-xs mt-1">{errors.courseImage.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[15px] font-medium text-gray-900">Course Intro Video *</label>
                <div className="relative h-[160px] border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center hover:border-blue-400 transition-all cursor-pointer bg-white group">
                  <input
                    type="file"
                    accept="video/*"
                    {...register("courseVideo")}
                    onChange={(e) => setPreviews(prev => ({ ...prev, vidName: e.target.files[0]?.name }))}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <Upload className="w-10 h-10 text-gray-400 mb-3 group-hover:text-blue-500 transition-colors" strokeWidth={1.5} />
                  <p className="text-[15px] text-slate-700 mb-1">
                    {previews.vidName ? <span className="text-blue-600">{previews.vidName}</span> : "Click to upload intro video"}
                  </p>
                  <p className="text-[13px] text-gray-500">MP4, MOV up to 100MB</p>
                </div>
                {errors.courseVideo && <p className="text-red-500 text-xs mt-1">{errors.courseVideo.message}</p>}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-start gap-4 pt-6">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  reset();
                  setPreviews({ imgName: "", vidName: "" });
                }}
                className="w-32 h-[44px] rounded-[8px] border-gray-200 font-medium text-gray-900 hover:bg-gray-50 transition-all"
              >
                Clear
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-32 h-[44px] rounded-[8px] bg-[#0A0A0B] text-white font-medium hover:bg-black/90 transition-all"
              >
                {isSubmitting ? "Adding..." : "Add Course"}
              </Button>
            </div>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewCourse;