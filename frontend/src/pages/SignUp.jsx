import React, { useContext, useRef, useState } from 'react'
import dp from "../assets/dp.webp"
import { dataContext } from '../context/UserContext'
import axios from "axios"
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa"; 
import { useNavigate } from 'react-router-dom';

function SignUp() {
  let {serverURL,userData, setUserData, getUserData}=useContext(dataContext)
  let navigate = useNavigate()
  
  let [firstName,setFirstName] = useState("")
  let [lastName,setLastName] = useState("")
  let [userName,setUserName] = useState("")
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let [showPassword, setShowPassword] = useState(false);
  let file = useRef(null)

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      let formdata = new FormData();
      formdata.append("firstName", firstName);
      formdata.append("lastName", lastName);
      formdata.append("userName", userName);
      formdata.append("email", email);
      formdata.append("password", password);
      if (backendImage) {
        formdata.append("profileImage", backendImage);
      }

      let res = await axios.post(serverURL + "/api/signup", formdata, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200 || res.status === 201) {
        setFirstName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setBackendImage(null);
        setProfileImage(dp); 

        alert("Registration Successful!");

        await getUserData();
        setUserData(res.data.user);
        navigate("/");
      }

    } catch (error) {
      console.log("Signup Error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  let [profileImage,setProfileImage] = useState(dp)
  let [backendImage,setBackendImage] = useState(null)
  
  function handleImage(e){
    let file= e.target.files[0]
    setBackendImage(file)
    let image= URL.createObjectURL(file)
    setProfileImage(image)
  }

  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-[#ff7e5f] via-[#ff4b91] to-[#7a28cb] p-0 md:p-4 font-sans'>
      
      {/* PC par height compact karne ke liye py-8 aur md:py-6 use kiya hai */}
      <div className='relative w-full max-w-[480px] min-h-screen md:min-h-fit bg-white rounded-none md:rounded-[32px] shadow-none md:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col justify-center items-center py-8 md:py-6 px-6 md:px-8 z-10'>
        
        {/* Background Blobs */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[250px] h-[250px] bg-gradient-to-br from-[#f6d365] to-[#fda085] rounded-[60%_40%_30%_70%/50%_60%_40%_50%] opacity-80 z-0 pointer-events-none"></div>
        <div className="absolute top-[-5%] left-[-15%] w-[200px] h-[200px] bg-gradient-to-br from-[#ff9a9e] to-[#fecfef] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-60 z-0 pointer-events-none"></div>

        <h1 className='text-gray-800 text-2xl md:text-3xl font-bold mb-4 z-10 mt-4 md:mt-0'>Create Account</h1>
        
        {/* Gap kam karke gap-3 kiya taaki height kam ho */}
        <form className='w-full flex flex-col items-center justify-center gap-3 z-10' onSubmit={handleSignUp} autoComplete="off">
          
          <input type='file' hidden ref={file} onChange={handleImage} />
          

       {/* Profile Image (Slightly smaller margin bottom) */}
<div className='relative group cursor-pointer mb-1' onClick={() => file.current.click()}>
  <div className='absolute -inset-1 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300'></div>
  <div className='relative w-[90px] h-[90px] rounded-full bg-white p-[3px]'>
    
    {/* Background color ko thoda dark kiya (bg-gray-200) taaki shape dikhe */}
    <div className='w-full h-full rounded-full overflow-hidden relative bg-gray-200 flex justify-center items-center'>
        
        {/* AGAR default image (dp) hai, toh ICON dikhao */}
        {profileImage === dp ? (
          <FaUser className="text-gray-400 text-3xl" />
        ) : (
          /* AGAR user ne image select kar li hai, toh IMAGE dikhao */
          <img src={profileImage} alt='Profile' className='w-full h-full object-cover' />
        )}

        {/* Hover Overlay */}
        <div className='w-full h-full bg-black/40 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center text-white text-3xl font-light'>
          +
        </div>
    </div>
  </div>
</div>


          {/* Input heights reduced to h-[45px] */}
          <div className='w-full flex flex-col md:flex-row justify-between gap-3'>
            <div className='w-full flex items-center bg-gray-200 rounded-xl px-4 h-[45px] focus-within:ring-2 focus-within:ring-[#ff4b91] transition-all'>
              <FaUser className="text-gray-500 mr-3 shrink-0" />
              <input type='text' placeholder='First Name' className='bg-transparent border-none outline-none w-full text-gray-700 text-sm' value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
            </div>
            <div className='w-full flex items-center bg-gray-200 rounded-xl px-4 h-[45px] focus-within:ring-2 focus-within:ring-[#ff4b91] transition-all'>
              <FaUser className="text-gray-500 mr-3 shrink-0" />
              <input type='text' placeholder='Last Name' className='bg-transparent border-none outline-none w-full text-gray-700 text-sm' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
            </div>
          </div>

          <div className='w-full flex items-center bg-gray-200 rounded-xl px-4 h-[45px] focus-within:ring-2 focus-within:ring-[#ff4b91] transition-all'>
            <FaUser className="text-gray-500 mr-3 shrink-0" />
            <input type='text' placeholder='Username' className='bg-transparent border-none outline-none w-full text-gray-700 text-sm' value={userName} onChange={(e)=>setUserName(e.target.value)} />
          </div>

          <div className='w-full flex items-center bg-gray-200 rounded-xl px-4 h-[45px] focus-within:ring-2 focus-within:ring-[#ff4b91] transition-all'>
            <FaEnvelope className="text-gray-500 mr-3 shrink-0" />
            <input type='email' placeholder='Email Address' className='bg-transparent border-none outline-none w-full text-gray-700 text-sm' value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>

          <div className='w-full flex items-center bg-gray-200 rounded-xl px-4 h-[45px] relative focus-within:ring-2 focus-within:ring-[#ff4b91] transition-all'>
            <FaLock className="text-gray-500 mr-3 shrink-0" />
            <input type={showPassword ? "text" : "password"} placeholder='Password' autoComplete="new-password" className='bg-transparent border-none outline-none w-full text-gray-700 pr-[40px] text-sm' value={password} onChange={(e)=>setPassword(e.target.value)} />
            <div onClick={() => setShowPassword(!showPassword)} className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors text-[18px]'>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button type="submit" className='w-full h-[45px] mt-2 rounded-full bg-gradient-to-r from-[#ff7e5f] to-[#7a28cb] text-white font-semibold shadow-[0_10px_20px_rgba(122,40,203,0.3)] hover:shadow-[0_10px_25px_rgba(122,40,203,0.4)] hover:-translate-y-0.5 transition-all duration-300'>
            SIGN UP
          </button>
          
          <p className='text-gray-600 text-[13px] mt-2'>
            Already have an account? <span className='font-bold text-gray-900 hover:text-[#ff4b91] cursor-pointer transition-colors' onClick={()=>navigate("/login")}>Login here &rarr;</span> 
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

export default SignUp









