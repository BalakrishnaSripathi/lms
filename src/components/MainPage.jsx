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
          <img src={logo} alt="logo" className="w-[105px] h-[114px] absolute top-[-12px] left-[14px] p-[10px] gap-[10px] flex" />
          <img src={title} alt="title" className="w-[341px] h-[86px] absolute top-0 left-[109px]" />
        </div>

        <div className="flex gap-4">
          <button onClick={() => navigate("/staff-login")} className="h-[38px] px-4 rounded-lg bg-teal-700 text-white">
            Staff Login
          </button>
          <button onClick={()=>navigate("/student-login")} className="h-[38px] px-4 rounded-lg bg-teal-700 text-white">
            Student Login
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-[3px] border-[#5862CE] absolute top-[95.5px] w-full"></div>

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