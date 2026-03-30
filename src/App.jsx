import { Routes,Route } from 'react-router-dom'
import StaffLogin from './components/StaffLogin'
import StudentLogin from './components/StudentLogin'
import Header from './components/MainPage'

function App() {

  return (
    <div>
      <Routes>
         <Route path='/'element={<Header/>}/>
          <Route path='/staff-login'element={<StaffLogin/>}/>
          <Route path='/student-login' element={<StudentLogin/>}/>
      </Routes>
    </div>
  )
}

export default App
