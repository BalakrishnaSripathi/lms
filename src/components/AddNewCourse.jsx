import React from 'react'
import Vector from '../assets/vector.png' 
import wrong from '../assets/wrong.png'
import { CardTitle } from './ui/card'

const AddNewCourse = () => {

  return (
   <div className='w-[848px] h-[843.33px] rounded-[14px] border-t-[0.67px] border-t-black/10 bg-[#F9FAFB];
'><command />
    <header className='w-[846.67px] h-[90px] top-[0.67px] left-[0.67px]'>
        <div className="w-[798.66px] h-[60px] flex justify-between absolute top-[24px] left-[24px]">
            <container className='flex gap-[12px]'>
                <icon className='w-[32px] h-[32px]'>
                    <img src={Vector} alt="" />
                </icon>
                <container className="w-[364px] h-[60px]">
                    <CardTitle className="w-[243px] h-[36px] relative -top-[2px] font-medium text-[30px] leading-[36px] tracking-normal text-[#0A0A0A]">
                        Add New Course
                    </CardTitle>
                    <p className="w-[391px] h-[24px] relative -top-[1.67px]
              text-[16px] leading-[24px] font-normal
              tracking-normal text-[#717182]">
                Fill in the details to add a new course to the catalog
                    </p>

                </container>
            </container>
            <button className='w-[24px] h-[24px]'>
                <img src={wrong} alt="" />
            </button>
        </div>
    </header>

   </div>
  )
}

export default AddNewCourse
