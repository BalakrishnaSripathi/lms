import React, { useState } from "react";
import { Eye, EyeOff, Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import LoginIcon from "../assets/loginicon.png";

// Schema matching your backend requirements
const schema = z.object({
  firstNm: z.string().min(1, "First Name required"),
  lastNm: z.string().min(1, "Last Name required"),
  gender: z.string().min(1, "Gender required"),
  dob: z.string().min(1, "Date of Birth required"),
  addr1: z.string().min(1, "Address Line 1 required"),
  addr2: z.string().optional().default(""),
  city: z.string().min(1, "City required"),
  state: z.string().min(1, "State required"),
  country: z.string().min(1, "Country required"),
  pin: z.string().min(5, "Invalid PIN"),
  emailId: z.string().email("Invalid email"),
  mobileNum: z.string().length(10, "Mobile must be 10 digits"),
  password: z.string().min(5, "Min 5 characters"),
  emergencyContactNm: z.string().min(1, "Required"),
  emergencyContactNum: z.string().min(10, "Invalid number"),
  profileImg: z.any().refine((files) => files?.length > 0, "Profile image is required"),
});

const StudentRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const file = data.profileImg[0];
      
      // Constructing the file path string to send in JSON
      // This matches your backend storage logic (uploads\timestamp-name.jpg)
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `uploads\\${fileName}`;

      // Create the JSON payload
      const payload = {
        firstNm: data.firstNm,
        lastNm: data.lastNm,
        gender: data.gender,
        dob: data.dob,
        addr1: data.addr1,
        addr2: data.addr2,
        city: data.city,
        state: data.state,
        country: data.country,
        pin: data.pin,
        emailId: data.emailId,
        mobileNum: data.mobileNum,
        password: data.password,
        emergencyContactNm: data.emergencyContactNm,
        emergencyContactNum: data.emergencyContactNum,
        profileImg: filePath, // Sending the PATH string, not the file bits
      };

      console.log("Sending JSON Payload:", payload);

      const response = await fetch("http://localhost:9090/api/student/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      alert("Student Registered Successfully! ✅");
      reset();
      setPreview(null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const inputClass = (error) =>
    `w-full px-4 py-2 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-[#00BBA7] ${
      error ? "border-red-500" : "border-gray-300"
    } bg-gray-50 text-sm`;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* LG Device Fix: Same dimensions (700px width), Responsive for MD/SM */}
      <div className="w-full lg:w-[700px] bg-white shadow-2xl rounded-2xl border-t-8 border-[#00BBA7] overflow-hidden">
        
        <div className="pt-8 text-center">
          <div className="relative inline-block">
             <img 
               src={preview || LoginIcon} 
               alt="Profile" 
               className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-gray-100 shadow-sm" 
             />
             {!preview && (
               <div className="absolute bottom-2 right-0 bg-[#00BBA7] p-1.5 rounded-full text-white">
                 <Camera size={14}/>
               </div>
             )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">Register Student</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">First Name</label>
              <input {...register("firstNm")} className={inputClass(errors.firstNm)} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Last Name</label>
              <input {...register("lastNm")} className={inputClass(errors.lastNm)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Gender</label>
              <select {...register("gender")} className={inputClass(errors.gender)}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Date of Birth</label>
              <input type="date" {...register("dob")} className={inputClass(errors.dob)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Email ID</label>
              <input {...register("emailId")} className={inputClass(errors.emailId)} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Mobile</label>
              <input {...register("mobileNum")} className={inputClass(errors.mobileNum)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Address Line 1</label>
              <input {...register("addr1")} className={inputClass(errors.addr1)} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Address Line 2</label>
              <input {...register("addr2")} className={inputClass()} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <input {...register("city")} placeholder="City" className={inputClass(errors.city)} />
            <input {...register("state")} placeholder="State" className={inputClass(errors.state)} />
            <input {...register("country")} placeholder="Country" className={inputClass(errors.country)} />
            <input {...register("pin")} placeholder="PIN" className={inputClass(errors.pin)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  {...register("password")} 
                  className={inputClass(errors.password)} 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-2.5 text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Profile Photo</label>
              <div className="relative flex items-center justify-center h-10 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  {...register("profileImg", {
                    onChange: (e) => {
                      const file = e.target.files[0];
                      if (file) setPreview(URL.createObjectURL(file));
                    }
                  })}
                />
                <span className="text-[10px] text-gray-400 font-medium truncate px-2">
                  {preview ? "Image Attached" : "Click to select"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Emergency Name</label>
              <input {...register("emergencyContactNm")} className={inputClass(errors.emergencyContactNm)} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Emergency No</label>
              <input {...register("emergencyContactNum")} className={inputClass(errors.emergencyContactNum)} />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-95 disabled:bg-gray-400"
            >
              {isSubmitting ? "Registering..." : "Submit Registration"}
            </button>
            <button
              type="button"
              onClick={() => { reset(); setPreview(null); }}
              className="px-8 py-4 border-2 border-gray-200 text-gray-500 font-bold rounded-xl hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;