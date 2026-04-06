import { Card, CardDescription, CardHeader, CardTitle,CardContent} from "@/components/ui/card"
import { Button } from "./ui/button";
import Vector from '../assets/vector.png' 
import { X,Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

const AddNewCours = () => {
  const {register}=useForm()

    const [files, setFiles] = useState({
      courseImage: null,
      courseVideo: null,
    });

  return (
    <div className="flex justify-center">
   <Card className="w-[848px] h-[800px] rounded-[14px] border-[0.67px] ">
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
        <form>
          <div  className="flex flex-col gap-6">
          <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="courseId">Course ID*</label>
              <input className="w-full h-[36px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]"
                {...register('courseId')}
                id="courseId"
                type="text"
                placeholder="e.g.,CS101"
                required
              />
          </div>
          <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="courseId">Course Title *</label>
              <input className="w-full h-[36px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]"
                {...register('coursetitle')}
                id="coursetitle"
                type="text"
                placeholder="e.g., Introduction to Computer Science"
                required
              />
          </div>

          <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="courseId">Description *</label>
              <textarea className="w-full h-[64px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]"
                {...register('description')}
                id="description"
                type="text"
                placeholder="Provide a detailed description of the course..."
                required
              />
          </div>
              {/*Language And Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="courseId">Language *</label>
              <input className="w-full h-[36px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]"
                {...register('language')}
                id="language"
                type="text"
                placeholder="e.g., Introduction to Computer Science"
                required
              />
          </div>
          <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="courseId">Skills *</label>
              <input className="w-full h-[36px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]"
                {...register('skills')}
                id="skills"
                type="text"
                placeholder="e.g., Introduction to Computer Science"
                required
              />
          </div>
          </div> {/*Language */}
          {/* Subject , Provider And Level */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="courseId">Subject *</label>
              <select className="w-full h-[36px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]" name="" id="">
                <option value="">Select Subject</option>
                <option value="">Java</option>
                <option value="">Python</option>
              </select>
              </div>

              <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="courseId">Provider *</label>
              <select className="w-full h-[36px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]" name="" id="">
                <option value="">Select provider</option>
                <option value="">Remo1</option>
                <option value="">Remo2</option>
              </select>
              </div>

              <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="courseId">Level *</label>
              <select className="w-full h-[36px] rounded-[8px] border-[0.67px] bg-[#F3F3F5]" name="" id="">
                <option value="">Select Level</option>
                <option value="">Level 1</option>
                <option value="">Level 2</option>
              </select>
              </div>

            </div> {/*End Subject , Provider And Level */}
            {/* Course IMAGE and course Intro Video */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="courseId">Course Image *</label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                <input 
                  type="file" 
                  accept="image/*"
                   onChange={(e) => setFiles((prev) => ({...prev,courseImage: e.target.files[0],}))}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Upload className="w-[48px] h-[48px] mb-2" />
                  {files.courseImage ? files.courseImage.name :<> <p className="h-[20px] font-[Inter]">Click to upload course image</p>
                  <p className="h-[16px] font-[Inter]">PNG, JPG up to 10MB</p></> }
                </div>
              </div>
            </div>
            
            
              <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="courseId">Course Intro Video *</label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                <input 
                  type="file" 
                  accept="image/*"
                   onChange={(e) => setFiles((prev) => ({...prev,courseVideo: e.target.files[0],}))}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Upload className="w-[48px] h-[48px] mb-2" />
                  {files.courseVideo ? files.courseVideo.name :<> <p className="h-[20px] font-[Inter]">Click to upload intro video</p>
                  <p className="h-[16px] font-[Inter]">MP4, MOV up to 100MB</p> </>}
                </div>
              </div>
            </div>
            </div> 

          </div>{/*main Div */}
             <div className="flex justify-start gap-[12px] mt-8 pt-6">
            <Button variant="outline"  type="button" className="h-[36px] pt-[8px] pb-[8px] ps-[32px] pe-[32px] hover:text-white hover:bg-black active:scale-95">Cancel</Button>
            <Button variant="outline" type="submit" className="h-[36px] pt-[8px] pb-[8px] ps-[32px] pe-[32px] hover:text-white hover:bg-black active:scale-95">Add Course</Button>
          </div>
        </form>
      </CardContent>

    </Card>
    </div>
  )
}

export default AddNewCours
