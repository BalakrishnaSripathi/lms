import axios from "axios";
import React, { useState } from "react";

export const ViewCourses = () => {
  const [lastCourseId, setLastCourseId] = useState("");

  const getCourse = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9090/api/course/view-courses"
      );

      const courses = res.data;

      if (courses.length > 0) {
        const lastCourse = courses[courses.length - 1];
        setLastCourseId(lastCourse.courseId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={getCourse}>GET Last Course ID</button>

      <h2>{lastCourseId}</h2>
    </div>
  );
};