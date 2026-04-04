import { Card, CardDescription, CardHeader, CardTitle,CardContent} from "@/components/ui/card"
import Vector from '../assets/vector.png' 
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

const AddNewCours1 = () => {
  const {register}=useForm()
  return (
    <div className="flex justify-center">
   <Card className="w-[848px] h-[843px] rounded-[14px] border-[0.67px] border-red-500">
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
              <input className="w-full h-[36px] rounded-[8px] border-[0.67px] border-[#000000]"
                {...register('courseId')}
                id="courseId"
                type="text"
                placeholder="e.g.,CS101"
                required
              />
          </div>
          <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="courseId">Course Title *</label>
              <input className="w-full h-[36px] rounded-[8px] border-[0.67px] border-[#000000]"
                {...register('courseId')}
                id="courseId"
                type="text"
                placeholder="e.g., Introduction to Computer Science"
                required
              />
          </div>

          <div className="grid gap-2">
              <label className="h-[14px]" htmlFor="courseId">Description *</label>
              <textarea className="w-full h-[64px] rounded-[8px] border-[0.67px] border-[#000000]"
                {...register('courseId')}
                id="courseId"
                type="text"
                placeholder="Provide a detailed description of the course..."
                required
              />
          </div>

          </div>
        </form>
      </CardContent>

    </Card>
    </div>
  )
}

export default AddNewCours1
