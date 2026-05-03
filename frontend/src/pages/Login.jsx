import React, { useContext, useState } from 'react'
import { dataContext } from '../context/UserContext'
import axios from 'axios'
// FaEnvelope aur FaLock ko add kiya gaya hai icons ke liye
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Login() {
  let {serverURL,userData,setUserData,getUserData}=useContext(dataContext)
  let navigate = useNavigate()
  
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e)=>{
    e.preventDefault()
    try {
      let {data}=await axios.post(serverURL + "/api/login",{
        email,
        password
      },{withCredentials : true})
    
      setUserData(data.user)
      await getUserData()
    
      if(userData){
        navigate("/")
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      console.log("Login Error:", errorMessage);
      alert(errorMessage);
    }
  }

  return (
    // Mobile ke liye p-0, PC ke liye p-4
    <div className='w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-[#ff7e5f] via-[#ff4b91] to-[#7a28cb] p-0 md:p-4 font-sans'>
      
      {/* Mobile ke liye min-h-screen aur rounded-none, PC ke liye compact height aur rounded corners */}
      <div className='relative w-full max-w-[480px] min-h-screen md:min-h-fit bg-white rounded-none md:rounded-[32px] shadow-none md:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col justify-center items-center py-8 md:py-10 px-6 md:px-8 z-10'>
        
        {/* Background Blobs */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[250px] h-[250px] bg-gradient-to-br from-[#f6d365] to-[#fda085] rounded-[60%_40%_30%_70%/50%_60%_40%_50%] opacity-80 z-0 pointer-events-none"></div>
        <div className="absolute top-[-5%] left-[-15%] w-[200px] h-[200px] bg-gradient-to-br from-[#ff9a9e] to-[#fecfef] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-60 z-0 pointer-events-none"></div>

        <h1 className='text-gray-800 text-2xl md:text-3xl font-bold mb-8 z-10 mt-4 md:mt-0'>User Login</h1>
        
        <form className='w-full flex flex-col items-center justify-center gap-4 z-10' onSubmit={handleLogin} >

          {/* Email Input */}
          <div className='w-full flex items-center bg-gray-200 rounded-xl px-4 h-[45px] focus-within:ring-2 focus-within:ring-[#ff4b91] transition-all'>
            <FaEnvelope className="text-gray-500 mr-3 shrink-0" />
            <input 
              type='text' 
              placeholder='Email' 
              autoComplete="off" 
              className='bg-transparent border-none outline-none w-full text-gray-700 text-sm'
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
            />
          </div>

          {/* Password Input */}
          <div className='w-full flex items-center bg-gray-200 rounded-xl px-4 h-[45px] relative focus-within:ring-2 focus-within:ring-[#ff4b91] transition-all'>
            <FaLock className="text-gray-500 mr-3 shrink-0" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder='Password'
              autoComplete="new-password" 
              className='bg-transparent border-none outline-none w-full text-gray-700 pr-[40px] text-sm' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            {/* Eye Icon Button */}
            <div 
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors text-[18px]'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Login Button */}
          <button type="submit" className='w-full h-[45px] mt-2 rounded-full bg-gradient-to-r from-[#ff7e5f] to-[#7a28cb] text-white font-semibold shadow-[0_10px_20px_rgba(122,40,203,0.3)] hover:shadow-[0_10px_25px_rgba(122,40,203,0.4)] hover:-translate-y-0.5 transition-all duration-300'>
            LOGIN
          </button>
             
          <p className='text-gray-600 text-[13px] mt-4'>
            Create a new account? <span className='font-bold text-gray-900 hover:text-[#ff4b91] cursor-pointer transition-colors' onClick={()=>navigate("/signup")}>Sign Up instead &rarr;</span> 
          </p>


<footer className="fixed bottom-4 right-4 bg-black/5 backdrop-blur-[2px] px-2 py-1 rounded-md transition-all duration-300 hover:bg-black/20 hover:backdrop-blur-md group">
  <p className="text-[10px] text-white/30 tracking-widest uppercase group-hover:text-white/90 transition-colors">
    Developed by <span className="font-bold">Faisal</span>
  </p>
</footer>



        </form>
   
      </div>
    </div>
  )
}

export default Login


