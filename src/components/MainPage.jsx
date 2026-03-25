import React from "react";
import logo from "../assets/logo.png";
import java from "../assets/java.png";
import spring from "../assets/spring.png";
import reactIcon from "../assets/react.png";
import python from "../assets/python.png";
import ai from "../assets/ai.png";
import aws from "../assets/aws.png";
import linux from "../assets/linux.png";
import node from "../assets/node.png";
import mobile from "../assets/mobile.png";
import angular from "../assets/angular.png";
import iot from "../assets/iot.png";
import title from "../assets/title.png"
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
  const techStack = [
    { img: java, name: "Java" },
    { img: spring, name: "Spring Boot" },
    { img: reactIcon, name: "React JS" },
    { img: python, name: "Python" },
    { img: ai, name: "AI" },
    { img: aws, name: "AWS" },
    { img: linux, name: "Linux" },
    { img: node, name: "Node JS" },
    { img: mobile, name: "Mobile Apps" },
    { img: linux, name: "Linux" },
    { img: angular, name: "Mobile Apps" },
    { img: iot, name: "IoT" },
  ];

  return (
    <div className="w-full bg-#FFFFFF">
      {/* Top Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex gap-3">
          <img src={logo} alt="logo" className="w-[60px] h-[60px]
      sm:w-[80px] sm:h-[90px]
      md:w-[90px] md:h-[100px]
      lg:w-[105px] lg:h-[114px]
      absolute
      top-[-8px] sm:top-[-10px] md:top-[-10px] lg:top-[-12px]
      left-[8px] sm:left-[10px] md:left-[12px] lg:left-[14px]
      p-[6px] sm:p-[8px] md:p-[8px] lg:p-[10px]" />
          <img src={title} alt="title" className=" w-[180px]
      sm:w-[250px]
      md:w-[300px]
      lg:w-[341px]

      h-auto lg:h-[86px]

      absolute
      top-0
      left-[70px] sm:left-[90px] md:left-[100px] lg:left-[109px]" />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
          <button onClick={() => navigate("/staff-login")} className="h-[32px] sm:h-[34px] md:h-[36px] lg:h-[38px]
      px-3 sm:px-3.5 md:px-4
      text-sm sm:text-sm md:text-base
      rounded-lg bg-teal-700 text-white w-full sm:w-auto">
            Staff Login
          </button>
          <button onClick={()=>navigate("/student-login")} className="h-[32px] sm:h-[35px] md:h-[36px] lg:h-[38px]
      px-3 sm:px-3.5 md:px-4
      text-sm sm:text-sm md:text-base
      rounded-lg bg-teal-700 text-white w-full sm:w-auto">
            Student Login
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-[3px] border-[#5862CE] absolute mt-1 sm:mt-2 md:mt-3 lg:mt-4 w-full"></div>

      {/* Icons Section */}
      <div className="flex flex-wrap justify-center gap-10 py-6">
  {techStack.map((tech, index) => (
    <div
      key={index}
      className="w-[83px] h-[102px] py-1.5 px-2 gap-[4px] flex flex-col items-center"
    >
      <img
        src={tech.img}
        alt={tech.name}
        className="w-[67px] h-[67px]"
      />
    </div>
  ))}
</div>
    </div>
  );
};

export default Header;