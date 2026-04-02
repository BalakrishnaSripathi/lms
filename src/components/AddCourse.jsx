import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

export default function AddCourse() {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      
      {/* Modal */}
      <div className="bg-white w-[900px] rounded-xl p-6 shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Add New Course</h2>
            <p className="text-gray-500 text-sm">
              Fill in the details to add a new course to the catalog
            </p>
          </div>
          <X className="cursor-pointer text-gray-500" />
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Course ID */}
          <div>
            <label className="text-sm font-medium">Course ID *</label>
            <Input placeholder="e.g., CS101" />
          </div>

          {/* Course Title */}
          <div>
            <label className="text-sm font-medium">Course Title *</label>
            <Input placeholder="e.g., Introduction to Computer Science" />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description *</label>
            <Textarea placeholder="Provide a detailed description..." />
          </div>

          {/* Language + Skills */}
          <div className="grid grid-cols-2">
            <div >
              <label className="text-sm font-medium">Language *</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="telugu">Telugu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Skills *</label>
              <Input placeholder="e.g., Python, ML" />
            </div>
          </div>

          {/* Subject + Provider + Level */}
          <div className="grid grid-cols-3 ">
            <SelectField label="Subject" />
            <SelectField label="Provider" />
            <SelectField label="Level" />
          </div>

          {/* Upload Section */}
          <div className="grid grid-cols-2 gap-6">

            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium">Course Image *</label>
              <div className="mt-2 border-2 border-dashed rounded-xl p-6 text-center">
                <Input type="file" />
              </div>
            </div>

            {/* Video Upload */}
            <div>
              <label className="text-sm font-medium">Course Intro Video *</label>
              <div className="mt-2 border-2 border-dashed rounded-xl p-6 text-center">
                <Input type="file" accept="video/mp4" />
              </div>
            </div>

          </div>

          {/* Submit */}
          <div className="flex justify-end mt-4">
            <Button>Add Course</Button>
          </div>

        </div>
      </div>
    </div>
  )
}

/* Reusable Select Field */
const SelectField = ({ label }) => (
  <div>
    <label className="text-sm font-medium">{label} *</label>
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  </div>
)