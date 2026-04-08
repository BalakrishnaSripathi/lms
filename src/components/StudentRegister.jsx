import React, { useState } from "react";
import LoginIcon from "../assets/loginicon.png";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const schema = z.object({
  firstNm: z.string().min(1, "First Name required"),
  lastNm: z.string().min(1, "Last Name required"),
  gender: z.string().min(1, "Gender required"),
  dob: z.string().min(1, "Date of Birth required"),
  addr1: z.string().min(1, "Address Line 1 required"),
  addr2: z.string().optional(),
  city: z.string().min(1, "City required"),
  state: z.string().min(1, "State required"),
  country: z.string().min(1, "Country required"),
  pin: z.string().min(5, "Invalid PIN"),
  emailId: z.string().email("Invalid email"),
  mobileNum: z
    .string()
    .min(10, "Mobile must be 10 digits")
    .max(10, "Mobile must be 10 digits"),
  password: z.string().min(5, "Min 5 characters"),
  emergencyContactNm: z.string().min(1, "Required"),
  emergencyContactNum: z.string().min(10, "Invalid number"),
  profile_img: z
    .any()
    .refine((files) => files?.length > 0, "Profile image is required"),
});

const StudentRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const inputClass = (error) =>
    `w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-[#00BBA7] ${
      error ? "border-red-500" : "border-gray-300"
    }`;

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "profile_img") {
  
          if (data[key][0]) {
            formData.append(key, data[key][0]);
          }
        } else if (data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });

      // 2. Make the API Call
      const response = await fetch("http://localhost:9090/api/student/register", {
        method: "POST",
        // Note: No headers needed for FormData, browser handles it
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle backend validation errors or server issues
        throw new Error(result.message || "Registration failed");
      }

      // 3. Success Feedback
      console.log("Success:", result);
      alert("Registration Successful! 🎉");
      
      // Reset form and UI
      reset();
      setPreview(null);
      
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.message || "Something went wrong. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-[14px] border-2 border-[#00BBA7]">
        <div className="pt-6 text-center">
          <img
            src={LoginIcon}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-3"
          />
          <h2 className="text-2xl font-bold">Create Account</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">First Name</label>
              <input
                {...register("firstNm")}
                placeholder="John"
                className={inputClass(errors.firstNm)}
              />
              <p className="text-red-500 text-xs">{errors.firstNm?.message}</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">Last Name</label>
              <input
                {...register("lastNm")}
                placeholder="Doe"
                className={inputClass(errors.lastNm)}
              />
              <p className="text-red-500 text-xs">{errors.lastNm?.message}</p>
            </div>
          </div>

          {/* Gender + DOB */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">Gender</label>
              <select {...register("gender")} className={inputClass(errors.gender)}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <p className="text-red-500 text-xs">{errors.gender?.message}</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">Date of Birth</label>
              <input type="date" {...register("dob")} className={inputClass(errors.dob)} />
              <p className="text-red-500 text-xs">{errors.dob?.message}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">Email</label>
              <input
                {...register("emailId")}
                placeholder="john@example.com"
                className={inputClass(errors.emailId)}
              />
              <p className="text-red-500 text-xs">{errors.emailId?.message}</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">Mobile Number</label>
              <input
                {...register("mobileNum")}
                placeholder="1234567890"
                className={inputClass(errors.mobileNum)}
              />
              <p className="text-red-500 text-xs">{errors.mobileNum?.message}</p>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-xs font-semibold text-gray-600">Address Line 1</label>
            <input {...register("addr1")} placeholder="Street Address" className={inputClass(errors.addr1)} />
            <p className="text-red-500 text-xs">{errors.addr1?.message}</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">Address Line 2 (Optional)</label>
            <input {...register("addr2")} placeholder="Apartment, suite, etc." className={inputClass()} />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">City</label>
              <input {...register("city")} placeholder="City" className={inputClass(errors.city)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">State</label>
              <input {...register("state")} placeholder="State" className={inputClass(errors.state)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">Country</label>
              <input {...register("country")} placeholder="Country" className={inputClass(errors.country)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">PIN</label>
              <input {...register("pin")} placeholder="PIN" className={inputClass(errors.pin)} />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Password"
                className={inputClass(errors.password)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
              <p className="text-red-500 text-xs">{errors.password?.message}</p>
            </div>
          </div>

          {/* Emergency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">Emergency Contact Name</label>
              <input {...register("emergencyContactNm")} placeholder="Contact Name" className={inputClass(errors.emergencyContactNm)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">Emergency Contact Number</label>
              <input {...register("emergencyContactNum")} placeholder="Contact Number" className={inputClass(errors.emergencyContactNum)} />
            </div>
          </div>

          {/* Profile Image */}
          <div className="mt-2">
  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>

  <div className="flex items-center gap-4">
    {/* Preview */}
    {preview && (
      <img
        src={preview}
        alt="Preview"
        className="w-24 h-24 rounded-full object-cover border border-gray-300"
      />
    )}

    {/* File Input Styled */}
    <div className="relative w-64 h-10">
      {/* Actual Input */}
      <input
        type="file"
        accept="image/*"
        {...register("profile_img")}
        onChange={(e) => {
          register("profile_img").onChange(e); // react-hook-form binding
          handleImageChange(e); // update preview
        }}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      {/* Styled Placeholder */}
      <div className="w-full h-full flex items-center justify-center bg-gray-50 border border-gray-300 rounded-lg text-gray-500 text-sm hover:bg-gray-100 cursor-pointer">
        Click or drag to upload
      </div>
    </div>
  </div>
  <p className="text-red-500 text-xs mt-1">{errors.profile_img?.message}</p>
</div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 rounded-lg text-white ${!isValid ? "bg-gray-400" : "bg-black"}`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/student-login" className="text-[#00BBA7] underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;