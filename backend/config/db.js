import mongoos from "mongoose"

const connectDb = async ()=>{
    try {
        await mongoos.connect(process.env.MONGODB_URL)
        console.log("DB Connected")
    } catch (error) {
        console.log("Db Error", error)
    }
}

export default connectDb