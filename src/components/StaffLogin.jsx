import React from 'react'
import LoginIcone from '../assets/loginicon.png'
import { Eye,EyeOff } from "lucide-react";
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const schema=z.object({
    userId:z.string().min(1,"User ID is required")
    .min(6,"User ID must be at least 6 characters")
    .max(20, "User ID must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscore allowed"),

    password:z.string().min(1,"Password is required")
    .min(6,"Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters"),
})

const StaffLogin = () => {
    const [showPassword, setShowPassword] = useState(false)
    const {register,handleSubmit,reset,formState: { errors ,isValid,isSubmitting}} =useForm({resolver:zodResolver(schema),mode:"onChange"});

    const onSubmit=data=>{
        console.log(data);
        reset();
    }
  return (
    <div className='flex justify-center items-center min-h-screen px-4'>

  <div className='
    w-[320px] sm:w-[360px] md:w-[380px] lg:w-[400px]
    h-auto lg:h-[456.33px]

    rounded-[10px] sm:rounded-[12px] lg:rounded-[14px]
    border-[2px] lg:border-[2.67px] border-[#00BBA7]

    pt-[20px] sm:pt-[28px] md:pt-[30px] lg:pt-[34.67px]
    px-[20px] sm:px-[28px] md:px-[30px] lg:px-[34.67px]

    flex flex-col items-center
    gap-4 sm:gap-5 md:gap-5 lg:gap-6
  '>

    {/* Profile */}
    <img
      src={LoginIcone}
      alt='Profile'
      className='w-[50px] h-[50px] sm:w-[58px] sm:h-[58px] lg:w-[64px] lg:h-[64px] rounded-full'
    />

    {/* Title */}
    <h2 className='text-base sm:text-lg font-semibold'>
      Staff Login
    </h2>

    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col items-center'>

      {/* User ID */}
      <div className='w-full lg:w-[330.67px] flex flex-col gap-2'>
        <label htmlFor="userId" className='text-sm'>
          User ID / Mobile Number
        </label>

        <input
          {...register('userId')}
          type='text'
          id="userId"
          placeholder='Enter your User ID or Mobile Number'
          className='w-full h-[38px] sm:h-[40px] rounded-[8px] bg-gray-200 px-3 outline-none'
        />

        {errors.userId && (
          <p className='text-red-500 text-sm'>
            {errors.userId.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className='w-full lg:w-[330.67px] flex flex-col gap-2 mt-2'>
        <label htmlFor="password" className='text-sm'>
          Password
        </label>

        <div className='relative'>
          <input
            type={showPassword ? "text" : "password"}
            {...register('password')}
            id="password"
            placeholder='Enter your password'
            className='w-full h-[38px] sm:h-[40px] rounded-[8px] bg-gray-200 px-3 pr-10 outline-none'
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {errors.password && (
          <p className='text-red-500 text-sm'>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className={`
          w-full lg:w-[330.67px]
          h-[34px] sm:h-[36px]
          rounded-[8px] text-white transition mt-[14px] sm:mt-[16px]
          ${!isValid ? "bg-gray-500 cursor-not-allowed" : "bg-[#030213] hover:opacity-90"}
        `}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>

    {/* Forgot Password */}
    <p className='text-gray-400 text-sm underline cursor-pointer text-center mt-[12px] sm:mt-[16px]'>
      <Link to="/forgot-password">Forgot Password?</Link>
    </p>

  </div>
</div>
  )
}

export default StaffLogin