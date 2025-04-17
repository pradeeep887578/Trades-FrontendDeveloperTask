import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreatePassword from './pages/CreatePassword';
import EnterOtp from './pages/Enterotp';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
function App() {

  return (
    <>
    
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/createpassword" element={<CreatePassword />} />
        <Route path="/otp" element={<EnterOtp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
