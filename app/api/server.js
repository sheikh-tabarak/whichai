import mongoose from "mongoose";

async function dbConnect(){

    const db = await mongoose.connect(process.env.MONGODB_URI)
    const connect = db.connections[0].readyState;
    console.log(connect)

    if(connect==1){
        return true;
    }

    else{
        return false;
    }  
}

export default dbConnect;

