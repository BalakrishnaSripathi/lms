import React from 'react'
import Image from '../assets/image.png'
import { Eye } from "lucide-react"

const StaffLogin = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      
      <div className='w-[400px] h-[456.33px] rounded-[14px] border-[2.67px] border-[#00BBA7] pt-[34.67px] px-[34.67px] flex flex-col items-center gap-6'>
        
        {/* Profile Image */}
        <img
          src={Image}
          alt='Profile'
          className='w-[64px] h-[64px] rounded-full'
        />

        {/* Title */}
        <h2 className='text-#0A0A0A text-lg font-semibold'>
          Staff Login
        </h2>

        {/* User ID */}
        <div className='w-[330.67px] flex flex-col gap-2'>
          <label className='text-sm'>
            User ID / Mobile Number
          </label>
          <input
            type='text'
            placeholder='Enter your User ID or Mobile Number'
            className='w-full h-[40px] rounded-[8px] bg-gray-200 px-3 outline-none'
          />
        </div>

        {/* Password */}
        <div className='w-[330.67px] flex flex-col gap-2'>
          <label className='text-sm'>
            Password
          </label>

          <div className='relative'>
            <input
              type='password'
              placeholder='Enter your password'
              className='w-full h-[40px] rounded-[8px] bg-gray-200 px-3 pr-10 outline-none'
            />
            <Eye className='absolute right-3 top-2.5 text-gray-500 cursor-pointer' size={18} />
          </div>
        </div>

        {/* Button */}
        <button className='w-[330.67px] h-[36px] rounded-[8px] bg-[#030213] text-white'>
          Login
        </button>

        {/* Forgot Password */}
        <p className='text-gray-400 text-sm underline cursor-pointer'>
          Forgot Password?
        </p>

      </div>

    </div>
  )
}

export default StaffLogin