import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';
import LoginIcon from '@/assets/loginicon.png';
import { loginStudent } from '@/api/student.api';

const StudentLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleStudentLogin = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        username: data.identifier, // mapped from unified schema
        password: data.password,
      };
      
      const res = await loginStudent(payload);
      
      if (res.data.message === "OTP sent to your registered email") {
        navigate("/verify-otp");
        return; // Early return to prevent showing success toast below
      }
      
      // TODO: Replace with toast.success()
      alert(`${res.data.message} and your studentId: ${res.data.studentId}`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data || error.message;
      // TODO: Replace with toast.error()
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginForm
      title="Student Login"
      iconSrc={LoginIcon}
      onSubmit={handleStudentLogin}
      isSubmitting={isSubmitting}
      bottomLinks={
        <>
          <Link to="/student-register" className="hover:text-[#00BBA7] hover:underline transition-colors">
            Register
          </Link>
          {" | "}
          <Link to="/forgot-password" className="hover:text-[#00BBA7] hover:underline transition-colors">
            Forgot Password?
          </Link>
        </>
      }
    />
  );
};

export default StudentLogin;