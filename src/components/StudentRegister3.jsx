import React, { useState } from "react";
import LoginIcon from "../assets/loginicon.png";
import { Eye, EyeOff, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

/* ================= ZOD SCHEMA ================= */
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
  mobileNum: z.string().min(10).max(10),
  password: z.string().min(5),
  emergencyContactNm: z.string().min(1),
  emergencyContactNum: z.string().min(10),
  profile_img: z.any().refine((f) => f?.length > 0, "Image required"),
});

const StudentRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

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
    `w-full px-4 py-2 rounded-lg border ${
      error ? "border-red-500" : "border-gray-300"
    }`;

  const labelClass = "text-xs font-semibold text-gray-600 mb-1 block";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      const file = data.profile_img[0];
      const cloudData = new FormData();
      cloudData.append("file", file);
      cloudData.append("upload_preset", "upload_img");

      const cloudRes = await fetch(
        "https://api.cloudinary.com/v1_1/dwmj7vogf/image/upload",
        { method: "POST", body: cloudData }
      );

      const cloudResult = await cloudRes.json();
      const imageUrl = cloudResult.secure_url;

      const payload = { ...data, profile_img: imageUrl };

      const response = await fetch(
        "http://localhost:9090/api/student/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Registration failed");

      alert("Registered Successfully ✅");
      reset();
      setPreview(null);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-bold text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* NAME */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>First Name</label>
              <input {...register("firstNm")} className={inputClass(errors.firstNm)} />
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input {...register("lastNm")} className={inputClass(errors.lastNm)} />
            </div>
          </div>

          {/* GENDER + DOB */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Gender</label>
              <select {...register("gender")} className={inputClass(errors.gender)}>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Date of Birth</label>
              <input type="date" {...register("dob")} className={inputClass(errors.dob)} />
            </div>
          </div>

          {/* CONTACT */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Email</label>
              <input {...register("emailId")} className={inputClass(errors.emailId)} />
            </div>
            <div>
              <label className={labelClass}>Mobile Number</label>
              <input {...register("mobileNum")} className={inputClass(errors.mobileNum)} />
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <label className={labelClass}>Address Line 1</label>
            <input {...register("addr1")} className={inputClass(errors.addr1)} />
          </div>

          <div>
            <label className={labelClass}>Address Line 2</label>
            <input {...register("addr2")} className={inputClass()} />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className={labelClass}>City</label>
              <input {...register("city")} className={inputClass(errors.city)} />
            </div>
            <div>
              <label className={labelClass}>State</label>
              <input {...register("state")} className={inputClass(errors.state)} />
            </div>
            <div>
              <label className={labelClass}>Country</label>
              <input {...register("country")} className={inputClass(errors.country)} />
            </div>
            <div>
              <label className={labelClass}>PIN</label>
              <input {...register("pin")} className={inputClass(errors.pin)} />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={inputClass(errors.password)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {/* EMERGENCY */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Emergency Contact Name</label>
              <input {...register("emergencyContactNm")} className={inputClass(errors.emergencyContactNm)} />
            </div>
            <div>
              <label className={labelClass}>Emergency Contact Number</label>
              <input {...register("emergencyContactNum")} className={inputClass(errors.emergencyContactNum)} />
            </div>
          </div>

          {/* PROFILE IMAGE */}
          <div>
            <label className={labelClass}>Profile Image</label>

            <div className="flex items-center gap-4">
              {preview && (
                <img src={preview} className="w-20 h-20 rounded-full object-cover border" />
              )}

              <div className="relative w-64 h-12">
                <input
                  type="file"
                  accept="image/*"
                  {...register("profile_img", { onChange: handleImageChange })}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />

                <div className="flex items-center justify-center gap-2 w-full h-full border rounded-lg bg-gray-50 text-gray-500 text-sm hover:bg-gray-100">
                  <Upload size={16} />
                  Upload Profile Image
                </div>
              </div>
            </div>

            <p className="text-red-500 text-xs">{errors.profile_img?.message}</p>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting || uploading}
            className="w-full bg-black text-white py-2 rounded"
          >
            {uploading ? "Uploading Image..." : "Register"}
          </button>

          {/* LOGIN */}
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/student-login" className="text-blue-500 underline">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default StudentRegister;