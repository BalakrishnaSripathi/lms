import React from 'react'
import Vector from '../assets/vector.png'
import wrong from '../assets/wrong.png'
import { CardTitle } from './ui/card'

const AddNewCourse = () => {
  return (
    <div className="w-[848px] h-[843px] rounded-[14px] border-t border-t-black/10 bg-white relative">

      {/* Header */}
      <header className="w-full h-[90px] flex items-center justify-center">
        
        <div className="w-[798px] flex justify-between items-start">

          {/* Left Section */}
          <div className="flex gap-3 items-start">
            
            {/* Icon */}
            <img src={Vector} alt="icon" className="w-8 h-8" />

            {/* Text */}
            <div>
              <CardTitle className="text-[30px] font-medium leading-[36px] text-[#0A0A0A]">
                Add New Course
              </CardTitle>

              <p className="text-[16px] leading-[24px] text-[#717182]">
                Fill in the details to add a new course to the catalog
              </p>
            </div>

          </div>

          {/* Close Button */}
          <button>
            <img src={wrong} alt="close" className="w-6 h-6" />
          </button>

        </div>

      </header>

    </div>
  )
}

export default AddNewCourse