
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import AboutUs from './pages/Aboutus'
import Dashboard from './components/UserDashBoard'
import UserContextProvider from './context/UserContextProvider'
import TheamContextProvider from './context/TheamContextProvider'
import NotificationContextProvider from './context/NotificationContextProvider'
import AdminDashBoard from './components/AdminDashBoard'
import BookingDetailsContextProvider from './context/BookingDetailsContextProvider'
import Demo from './components/Demo'
// import { Toaster } from 'react-hot-toast'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DisplayAllHalls from './components/DisplayAllHalls'
import Contact from './pages/Contact';


function App() {
 

  return (
  


 
  
  
   <UserContextProvider>
   {/* */}
 
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/forgot' element={<ForgotPassword/>}/>
            
            <Route path='/user/dashboard' element={<Dashboard/>}/>
            
           <Route path='/about' element={<AboutUs/>}/>
           <Route path='//contact' element={<Contact/>}/>
         

            <Route path='/admin-dashboard' element={<AdminDashBoard/>}/>
          </Routes>

          <ToastContainer 
         
          autoClose='5000'
          newestOnTop
          draggable
          pauseOnHover/>
         
        </BrowserRouter>
     
        </UserContextProvider>
      
       
       

      
  )
}

export default App
