import React, { useState } from 'react'
import LoginIcon from '../assets/loginicon.png'
import { Eye, EyeOff } from "lucide-react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from "react-router-dom"
import { loginStudent } from '@/api/student.api';

const schema = z.object({
  username: z.string().min(1, "User ID is required").min(6, "User ID must be at least 6 characters"),
  password: z.string().min(1, "Password is required").min(5, "Password must be at least 5 characters"),
})

const StudentLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitting }} = useForm({
    resolver: zodResolver(schema),
    mode: "onChange"
  });
  const navigate = useNavigate();
  const { setTempAuth } = useAuth();
  const onSubmit = async (data) => {
    try {
      const payload = { username: data.username, password: data.password };
      const res = await loginStudent(payload);
      
      if (res.data=== "Invalid login credentials") {
      setTempAuth({
      studentId: res.data.studentId,
      email: res.data.email
  });


        navigate("/verify-otp");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response?.data || "Login failed");
    }
    reset();
  };

  return (
    <div className='flex justify-center items-center min-h-screen px-4'>
      <h1>Balu</h1>
      <div className='w-[320px] sm:w-[380px] lg:w-[400px] rounded-[14px] border-[2px] border-[#00BBA7] p-8 flex flex-col items-center gap-6'>
        <img src={LoginIcon} alt='Profile' className='w-16 h-16 rounded-full' />
        <h2 className='text-black text-lg font-semibold'>Student Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='text-sm'>User ID / Mobile Number</label>
            <input {...register('username')} className='w-full h-10 rounded-lg bg-gray-200 px-3 outline-none' placeholder='Enter User ID' />
            <p className='text-red-500 text-xs'>{errors.username?.message}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm'>Password</label>
            <div className='relative'>
              <input type={showPassword ? "text" : "password"} {...register('password')} className='w-full h-10 rounded-lg bg-gray-200 px-3 outline-none' />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 cursor-pointer">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            <p className='text-red-500 text-xs'>{errors.password?.message}</p>
          </div>
          <button type="submit" disabled={!isValid || isSubmitting} className='w-full h-10 rounded-lg bg-[#030213] text-white disabled:bg-gray-500'>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default StudentLogin;