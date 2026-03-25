import React from 'react'
import LoginIcon from '../assets/loginicon.png'
import { Eye,EyeOff } from "lucide-react";
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react';
import { Link } from "react-router-dom"


const schema=z.object({
    userId:z.string().min(1,"User ID is required")
    .min(6, "User ID must be at least 6 characters")
    .max(20, "User ID must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscore allowed"),

    password:z.string().min(1,"Password is required")
        .min(6,"Password must be at least 6 characters")
        .max(20, "Password must not exceed 20 characters"),
        
})

const StudentLogin = () => {
    const [showPassword, setShowPassword] = useState(false)
    const {register,handleSubmit,reset,formState: { errors ,isValid,isSubmitting}} =useForm({resolver:zodResolver(schema),mode:"onChange"});

    const onSubmit=data=>{
        console.log(data);
        reset();
    }

  return (
   <div className='flex justify-center items-center min-h-screen'>
      <div className='w-[400px] h-[456.33px] rounded-[14px] border-[2.67px] border-[#00BBA7] pt-[34.67px] px-[34.67px] flex flex-col items-center gap-6'>
        <img src={LoginIcon} alt='Profile' className='w-[64px] h-[64px] rounded-full'/>
                {/* Title */}
        <h2 className='text-black text-lg font-semibold'>
                  Student Login
                </h2>
           <form onSubmit={handleSubmit(onSubmit)}>
                {/* User ID */}
                <div className='w-[330.67px] flex flex-col gap-2'>
                  <label htmlFor="userId" className='text-sm'>
                    User ID / Mobile Number
                  </label>
                  <input
                  {...register('userId')}
                    type='text'
                    id="userId" 
                    placeholder='Enter your User ID or Mobile Number'
                    className='w-full h-[40px] rounded-[8px] bg-gray-200 px-3 outline-none'
                  />{
                    errors.userId && (<p className='text-red-500 text-sm'>
                        {errors.userId.message}
                    </p>)
                  }
                </div>
        
                {/* Password */}
                <div className='w-[330.67px] flex flex-col gap-2'>
                  <label htmlFor="password" className='text-sm'>
                    Password
                  </label>
        
                  <div className='relative'>
                    <input
                    type={showPassword ? "text":"password"}
                    {...register('password')}
                    id="password" 
                      placeholder='Enter your password'
                      className='w-full h-[40px] rounded-[8px] bg-gray-200 px-3 pr-10 outline-none'
                    />
                    <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 cursor-pointer">
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
                  </div>
                  {
                    errors.password && (<p className='text-red-500 text-sm'>
                        {errors.password.message}
                    </p>)
                  }
                </div>
        
                {/* Button */}
                <button type="submit"
                    disabled={!isValid || isSubmitting}
                    className={`w-[330.67px] h-[36px] rounded-[8px] text-white transition mt-[16px]
                      ${!isValid ? "bg-gray-500 cursor-not-allowed" : "bg-[#030213] hover:opacity-90"}
                    `}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </form>

                <p className='text-gray-400 text-sm cursor-pointer text-center mt-[16px]'>
                        <Link to="/register" className="underline">Register</Link>{" "}|{" "}<Link to="/forgot-password" className="underline">Forgot Password?</Link>
                </p>
      </div>
    </div>
  )
}

export default StudentLogin
