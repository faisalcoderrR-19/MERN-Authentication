import React, { useContext } from 'react';
import { dataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  let { userData, setUserData, serverURL } = useContext(dataContext);
  const navigate = useNavigate();

  if (!userData) {
    navigate("/login");
  }

  const handleLogOut = async () => {
    try {
      await axios.post(serverURL + "/api/logout", {}, {
        withCredentials: true
      });
      setUserData(null);
    } catch (error) {
      console.log(error);
    }
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    /* 
      OUTER WRAPPER: 
      PC par gradient dikhega, lekin mobile par sirf white background rahega 
      taaki app jesa feel aaye.
    */
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-[#ff7e5f] via-[#ff4b91] to-[#7a28cb] max-sm:bg-[#fff5f8] max-sm:bg-none font-sans overflow-hidden">
      
      {/* 
        MAIN CONTAINER: 
        Mobile par 'w-full h-full' (No Card), 
        PC par 'max-w-[400px] shadow-2xl rounded-[45px]' (Card Look).
      */}
      <div className="relative w-full h-screen sm:h-auto sm:max-w-[400px] sm:min-h-[600px] sm:max-h-[750px] bg-[#fff5f8] sm:rounded-[45px] sm:shadow-[0_30px_100px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col items-center justify-center p-6 z-10">
        
        {/* Background Waves - Ab ye card ke andar hi rahenge */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[35%] bg-[#fbcfe8] [border-bottom-right-radius:100%] opacity-70"></div>
          <div className="absolute top-0 right-0 w-[60%] h-[25%] bg-[#ffedd5] [border-bottom-left-radius:100%] opacity-80"></div>
          <div className="absolute bottom-0 right-0 w-full h-[30%] bg-[#fee2e2] [border-top-left-radius:100%] opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-[50%] h-[20%] bg-[#ffedd5] [border-top-right-radius:100%] opacity-60"></div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 w-full flex flex-col items-center">

          {/* Profile Section */}
          <div className='relative mb-4'>
            <div className='absolute -inset-1.5 bg-gradient-to-r from-[#ff4b91] to-[#7a28cb] rounded-full blur opacity-25 animate-pulse'></div>
            <div className='relative w-[110px] h-[110px] rounded-full bg-white p-1 shadow-xl'>
              <div className='w-full h-full rounded-full overflow-hidden bg-gray-100'>
                <img src={userData?.profileImage || "https://via.placeholder.com/150"} alt='profile' className='w-full h-full object-cover' />
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-5">
            <p className="text-gray-500 font-semibold text-sm tracking-widest uppercase">{greeting}</p>
            <h1 className="text-3xl font-extrabold text-gray-800 mt-0.5">
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#ff4b91] to-[#7a28cb]'>
                {userData?.firstName}
              </span> {userData?.lastName}
            </h1>
          </div>

          {/* Information Panel */}
          <div className="w-full space-y-2.5 mb-8">
            <div className="w-full bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-3.5 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3">
                <span className="bg-pink-100 p-2 rounded-lg text-sm">👤</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Username</span>
              </div>
              <span className="text-gray-800 font-bold text-sm">@{userData?.userName || "user"}</span>
            </div>

            <div className="w-full bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-3.5 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 p-2 rounded-lg text-sm">✉️</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Email</span>
              </div>
              <span className="text-gray-800 font-bold truncate max-w-[140px] text-sm">{userData?.email || "user@mail.com"}</span>
            </div>

            <div className="w-full bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-3.5 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3">
                <span className="bg-purple-100 p-2 rounded-lg text-sm">🛡️</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Status</span>
              </div>
              <span className="text-[#ff4b91] font-black text-[10px] bg-pink-50 px-3 py-1 rounded-full border border-pink-100 tracking-widest">
                MEMBER
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogOut}
            className='w-full max-w-[220px] h-[50px] bg-gray-900 text-white rounded-2xl font-bold text-base shadow-xl hover:bg-black active:scale-95 transition-all duration-300 flex items-center justify-center gap-3'
          >
            <span>Sign Out</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* FOOTER: Fixed to screen bottom, works for both mobile and PC card */}
      <footer className="fixed bottom-4 right-4 bg-black/5 backdrop-blur-sm px-2 py-1 rounded-md border border-black/5 z-20">
        <p className="text-[10px] text-black/50 tracking-widest uppercase font-bold">
          Developed by <span className="text-black/80">Faisal</span>
        </p>
      </footer>
    </div>
  );
}

export default Home;







