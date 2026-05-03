import uploadOnCloudinary from "../config/cloudnary.js"
import generateToken from "../config/token.js"
import User from "../moduls/user.moduls.js"
import bcrypt from "bcryptjs"

export const signUp = async(req,res)=>{
   try {
    
     const {firstName,lastName,email,userName,password}= req.body

     if(!firstName || !lastName  || !email  || !userName || !password){
          return res.status(400).json({message : "send all details"})
     }

   let profileImageUrl = "";
   if(req.file){
     profileImageUrl = await uploadOnCloudinary(req.file.path);
   }

     let existUser = await User.findOne({email})
     if(existUser){
        return res.status(400).json({message : "User alredy exist"})
     }

     const hassedPasword = await bcrypt.hash(password,10)
   

     const user = await User.create({
        firstName,
        lastName,
        email,
        userName,
        password :hassedPasword,
       profileImage: profileImageUrl
     }) 

     let token
     try {
      token  = generateToken(user._id)
     } catch (error) {
      console.log(error)
     }
     
    

     res.cookie("token", token,{
        httpOnly : true,
        secure : process.env.NODE_ENV == "production",
        sameSite : "strict",
        maxAge : 7*24*60*60*1000
     })

     return res.status(201).json({user : {
           firstName,
        lastName,
        email,
        userName,
       profileImage: profileImageUrl
      
     }})


   } catch (error) {
      console.log("SERVER CRASH KA ASLI REASON: ", error);
    return res.status(500).json({message : "internal server error"})
   }
}

export    const login  = async (req,res) =>{

   try {
      const  {email,password} = req.body
      let existUser = await User.findOne({email})
      if(!existUser){
         return res.status(400).json({message:  "user  does not exit"})
      }

      let match=await bcrypt.compare(password,existUser.password)
      if(!match){
         return res.status(400).json({message : "Incorrect pasword"})
      }

        let token
     try {
      token  = generateToken(existUser._id)
     } catch (error) {
      console.log(error)
     }
     
    

   //   res.cookie("token", token,{
   //      httpOnly : true,
   //      secure : process.env.NODE_ENV == "production",
   //      sameSite : "strict",
   //      maxAge : 7*24*60*60*1000
   //   })


   res.cookie("token", token, {
    httpOnly: true,
    secure: false, // Localhost ke liye false hi rakhein
    sameSite: "lax", // 'strict' ki jagah 'lax' karein
    maxAge: 7 * 24 * 60 * 60 * 1000
});
   
     return  res.status(200).json({user:{
      firstName : existUser.firstName,
      lastName : existUser.lastName,
      email : existUser.email,
      userName : existUser.email,
      profileImage : existUser.profileImage
     }})

   } catch (error) {
      
      return res.status(500).json(error)
   }
}

export const logout = async (req,res) =>{
try {
   res.clearCookie("token")
   return  res.status(200).json({message : "Logout sucessfully"})
} catch (error) {
    return res.status(500).json(error)
}
}

export const getUserData= async (req,res) =>{
   try {
      let userId = req.userId
      if(!userId){
         return res.status(400).json({message : "user id not found"})
      }

      // .select("-password") ka matlab hai password field ko mat nikaalo
      let user = await User.findById(userId).select("-password");
      
      if(!user){
          return res.status(400).json({message : "user  not found"})
      }
         return res.status(200).json(user)
      
   } catch (error) {
      return res.status(500).json({message : error})
   }
}