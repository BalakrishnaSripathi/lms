import { Routes,Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import StaffLogin from './components/StaffLogin'
import StudentLogin from './components/StudentLogin'

function App() {

  return (
    <div>
      <Routes>
         <Route path='/'element={<MainPage/>}/>
          <Route path='/staff-login'element={<StaffLogin/>}/>
          <Route path='/student-login' element={<StudentLogin/>}/>
      </Routes>
    </div>
  )
}

export default App
