import axios from "axios";
import React, { useState } from "react";

const ViewStudents = () => {
  const [data, setStudent] = useState([]);

  const getusers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9090/api/student/view-students"
      );
      setStudent(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button onClick={getusers}>GET Student ID</button>

      <ol>
        {data.map((v) => (
            <div key={v.id} className="flex gap-4">
          <li>{v.id}</li> <li>{v.firstNm}</li>
          <img src={v.profileImg} alt="" />
          </div>
        ))}
      </ol>
    </div>
  );
};

export default ViewStudents;