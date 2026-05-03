import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import { dataContext } from './context/UserContext'

function App() {
  let { userData, loading } = useContext(dataContext)

  // Jab tak backend se pata na chale ki user login hai ya nahi, tab tak kuch mat dikhao
  if (loading) return null; 

  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to="/" />} />
      <Route path='/login' element={!userData ? <Login /> : <Navigate to="/" />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to="/login" />} />
      {/* Galat URL hone par login par bhej do */}
      <Route path='*' element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App; 


















































// import React, { useContext } from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import SignUp from './pages/SignUp'
// import Login from './pages/Login'
// import Home from './pages/Home'
// import { dataContext } from './context/UserContext'

// function App() {
//   // Context se userData nikaalna
//   let { userData } = useContext(dataContext)

//   return (
//     <Routes>
//       {/* 1. HOME ROUTE: 
//           Agar user login hai toh Home dikhao, 
//           warna usse '/login' page par bhej do (Navigate) */}
//       <Route 
//         path='/' 
//         element={userData ? <Home /> : <Navigate to="/login" />} 
//       />

//       {/* 2. LOGIN ROUTE: 
//           Agar user pehle se login hai aur wo login page par jane ki koshish kare,
//           toh use wapas '/' (Home) bhej do. Warna Login page dikhao. */}
//       <Route 
//         path='/login' 
//         element={!userData ? <Login /> : <Navigate to="/" />} 
//       />

//       {/* 3. SIGNUP ROUTE: 
//           Login user ko signup ki zaroorat nahi, isliye use Home bhej do.
//           Warna SignUp page dikhao. */}
//       <Route 
//         path='/signup' 
//         element={!userData ? <SignUp /> : <Navigate to="/" />} 
//       />

//       {/* 4. WRONG URL HANDLE: 
//           Agar user koi galat URL type kare, toh use Login par bhej do */}
//       <Route path='*' element={<Navigate to="/login" />} />
      
//     </Routes>
//   )
// }

// export default App
































// import React, { useContext } from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import SignUp from './pages/SignUp'
// import Login from './pages/Login'
// import Home from './pages/Home'
// import { dataContext } from './context/UserContext'

// function App() {
// let {userData,setUserData}=useContext(dataContext)

//   return (
//     <Routes>
//       <Route path='/signup' element={<SignUp/>} />
//       <Route path='login' element={<Login/>} />
//       <Route path='/' element={userData?<Home/>:<Login/>}/>    
//     </Routes>
//   )
// }

// export default App