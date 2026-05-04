import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const dataContext = createContext()

function UserContext({ children }) {
  let [userData, setUserData] = useState(null)
  let [loading, setLoading] = useState(true) // 1. Loading state add ki
  const serverURL = "https://mern-auth-backend-e79u.onrender.com"

  const getUserData = async () => {
    try {
      setLoading(true) // Data mangne se pehle loading true
      let { data } = await axios.get(serverURL + "/api/getuserdata", {
        withCredentials: true
      })

      if (data) {
        setUserData(data)
      }
    } catch (error) {
      console.log("Not logged in or session expired");
      setUserData(null);
    } finally {
      setLoading(false) // 2. Data mil jaye ya error aaye, loading khatam
    }
  }

  // Value mein 'loading' bhi pass karein
  const value = {
    serverURL, userData, setUserData, getUserData, loading
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <dataContext.Provider value={value}>
      {/* 3. Jab tak loading chal rahi hai, tab tak app render na karein */}
      {!loading ? children : <div className='bg-black h-screen text-white flex justify-center items-center'>Loading...</div>}
    </dataContext.Provider>
  )
}

export default UserContext

