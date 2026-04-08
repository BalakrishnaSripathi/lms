import { Card, CardDescription, CardHeader, CardTitle,CardContent} from "@/components/ui/card"
import { Button } from "./ui/button";
import Vector from '../assets/vector.png' 
import { X,Upload,Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  coursetitle: z.string().min(1, "Course title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  language: z.string().min(1, "Language is required"),
  skills: z.string().min(1, "Skills are required"),
  subject: z.string().min(1, "Subject is required"),
  provider: z.string().min(1, "Provider is required"),
  level: z.string().min(1, "Level is required"),

  courseImage: z
    .any()
    .refine((file) => file?.length === 1, "Course image is required"),

  courseVideo: z
    .any()
    .refine((file) => file?.length === 1, "Course video is required"),
});

const AddNewCours1 = () => {
  const { register, handleSubmit,reset,formState: { errors, isValid, isSubmitting },} = useForm({resolver: zodResolver(schema),mode: "onChange",});

    const [files, setFiles] = useState({
      courseImage: null,
      courseVideo: null,
    });

  const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


  const onSubmit = async (data) => {
  try {
    const imageFile = data.courseImage?.[0];
    const videoFile = data.courseVideo?.[0];

    // convert files → base64 strings
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

      courseImage: imageBase64,   // ✅ string
      introVideo: videoFile.name,    // ✅ string
    };
    console.log(payload)

    const response = await fetch("http://localhost:9090/api/course/create?staffId=2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed");
    }

    console.log("Success:", result);
    alert("Course created ✅");

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

  
 //console.log({ ...data, imageFile, videoFile });


  return (
    <div className="flex justify-center">
   <Card className="w-[848px] h-[870px] rounded-[14px] border-[0.67px] ">
     <CardHeader className="flex justify-between">
     <div className="flex">
         {/* icon */}
       <div className='w-[64px] h-[24px] p-2'>
          <img src={Vector} alt="" />
        </div>
      <div>
        <CardTitle className="font-['Inter'] font-medium text-[30px] leading-[36px] tracking-[0px]">Add New Course</CardTitle>
        <CardDescription className="font-['Inter'] font-normal text-[16px] leading-[24px] tracking-[0px]">Fill in the details to add a new course to the catalog</CardDescription>
      </div>
     </div>
      <button className="w-[40px] h-[40px] p-[8px] rounded-full hover:bg-gray-100 transition-colors">
            <X className="text-gray-500 w-6 h-6" />
          </button>
     </CardHeader>


      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div  className="flex flex-col gap-6">
          <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="courseId">Course ID*</label>
              <input className="w-full h-[36px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]"
                {...register('courseId')}
                id="courseId"
                type="text"
                placeholder="   e.g.,CS101"
                required
              />
               <p className="text-red-500 text-sm h-[18px]">{errors.courseId?.message}</p>
          </div>
          

          <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="coursetitle">Course Title *</label>
              <input className="w-full h-[36px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]"
                {...register('coursetitle')}
                id="coursetitle"
                type="text"
                placeholder="   e.g., Introduction to Computer Science"
                required
              /> <p className="text-red-500 text-sm h-[18px]">{errors.coursetitle?.message}</p>
          </div>
           


          <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="description">Description *</label>
              <textarea className="w-full h-[64px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]"
                {...register('description')}
                id="description"
                type="text"
                placeholder="   Provide a detailed description of the course..."
                required
              /> <p className='text-red-500 text-sm h-[18px]'>{errors.description?.message}</p>
          </div>
           

              {/*Language And Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="language">Language *</label>
               <select {...register("language")} className="w-full h-[36px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]" name="language" id="language">
                <option value="">Select language</option>
                <option value="aa">Remo1</option>
                <option value="bb">Remo2</option>
              </select>
               <p className="text-red-500 text-sm h-[18px]">{errors.language?.message}</p>
          </div>
          
          <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="skills">Skills *</label>
              <input className="w-full h-[36px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]"
                {...register('skills')}
                id="skills"
                type="text"
                placeholder="   e.g., Introduction to Computer Science"
                required
              />
               <p className="text-red-500 text-sm h-[18px]">{errors.skills?.message}</p>
          </div>
          </div> {/*Language */}
          {/* Subject , Provider And Level */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="subject">Subject *</label>
              <select {...register("subject")} className="w-full h-[36px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]" name="subject" id="subject">
                <option value="">Select Subject</option>
                <option value="1">Java</option>
                <option value="2">Python</option>
              </select>
              </div>

              <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="provider">Provider *</label>
              <select {...register("provider")} className="w-full h-[36px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]" name="provider" id="provider">
                <option value="">Select provider</option>
                <option value="1">Remo1</option>
                <option value="2">Remo2</option>
              </select>
              </div>

              <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="level">Level *</label>
              <select {...register("level")} className="w-full h-[36px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]" name="level" id="level">
                <option value="" className="text-[#717182]">Select Level</option>
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
              </div>

            </div> {/*End Subject , Provider And Level */}
            {/* Course IMAGE and course Intro Video */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="courseImage">Course Image *</label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                <input 
                  type="file" 
                  accept="image/*"
                   {...register("courseImage")}
                   onChange={(e) => setFiles((prev) => ({...prev,courseImage: e.target.files[0],}))}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Image className="w-[48px] h-[48px] mb-2" />
                  {files.courseImage ? files.courseImage.name :<> <p className="h-[20px] font-[Inter]">Click to upload course image</p>
                  <p className="h-[16px] font-[Inter]">PNG, JPG up to 10MB</p></> }
                </div>
              </div>
               <p className="text-red-500 text-sm h-[18px]">{errors.courseImage?.message}</p>
            </div>
           

            
            
              <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="courseVideo">Course Intro Video *</label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                <input 
                  type="file" 
                   accept="video/*"
                    {...register("courseVideo")}  
                   onChange={(e) => setFiles((prev) => ({...prev,courseVideo: e.target.files[0],}))}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Upload className="w-[48px] h-[48px] mb-2" />
                  {files.courseVideo ? files.courseVideo.name :<> <p className="h-[20px] font-[Inter]">Click to upload intro video</p>
                  <p className="h-[16px] font-[Inter]">MP4, MOV up to 100MB</p> </>}
                </div>
              </div>
               <p className="text-red-500 text-sm h-[18px]">{errors.courseVideo?.message}</p>
            </div>
            
            </div> 

          </div>{/*main Div */}
             <div className="flex justify-start gap-[8px] mt-4">
            <Button variant="outline"  type="button" onClick={()=>reset()} className="h-[36px] pt-[8px] pb-[8px] ps-[32px] pe-[32px] hover:text-white hover:bg-black active:scale-95">Cancel</Button>
            <Button variant="outline" type="submit"  className="h-[36px] pt-[8px] pb-[8px] ps-[32px] pe-[32px] hover:text-white hover:bg-black active:scale-95"> {isSubmitting ? "Adding..." : "Add Course"}</Button>
          </div>
        </form>
      </CardContent>

    </Card>
    </div>
  )
}

export default AddNewCours1
