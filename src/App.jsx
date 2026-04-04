import { Routes,Route } from 'react-router-dom'
import StaffLogin from './components/StaffLogin'
import StudentLogin from './components/StudentLogin'
import Header from './components/MainPage'
import AddNewCourse from './components/AddNewCourse'
import AddCourse from './components/AddCourse'
import StudentRegister from './components/StudentRegister'
import InputOTPForm from './components/VerifyloginOtp'
import AddNewCours1 from './components/AddNewCours1'

function App() {

  return (
    <div>
      <Routes>

         <Route path='/' element={<Header/>}/>
         <Route path='/addCourse' element={<AddNewCours1/>}/>
          <Route path='/staff-login'element={<StaffLogin/>}/>
          <Route path='/student-login' element={<StudentLogin/>}/>
          <Route path='/verify-otp' element={<InputOTPForm/>}/>
          <Route path='/student-register' element={<StudentRegister/>}/>
      </Routes>
    </div>
  )
}

export default App
