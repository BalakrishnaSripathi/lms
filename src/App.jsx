import { Routes,Route } from 'react-router-dom'

import Header from './components/MainPage'
import AddNewCourse from './components/AddNewCourse'
import AddCourse from './components/AddCourse'
import StudentRegister2 from './components/StudentRegister2'
import InputOTPForm from './components/VerifyloginOtp'
import AddNewCours1 from './components/AddNewCours1'
import ViewStudents from './components/ViewStudents'
import { ViewCourses } from './components/ViewCourses'
import StaffLogin from './pages/StaffLogin'
import StudentLogin from './pages/StudentLogin'
import AddCourse1 from './components/AddCourse1'
import CourseBuilder from './pages/CourseBuilder'
import CourseStructureBuilder from './pages/course-builder/CourseStructureBuilder'
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <div>
 <Toaster position="top-right" />
      <Routes>
         <Route path='/' element={<Header/>}/>
         <Route path='/addCourse' element={<AddCourse1/>}/>
          <Route path='/staff-login'element={<StaffLogin/>}/>
          <Route path='/student-login' element={<StudentLogin/>}/>
          <Route path='/verify-otp' element={<InputOTPForm/>}/>
          <Route path='/student-register' element={<StudentRegister2/>}/>
          <Route path='/bui' element={<CourseStructureBuilder/>}/>
      </Routes>
    </div>
  )
}

export default App
