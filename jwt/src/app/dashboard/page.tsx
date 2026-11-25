import { connectDB } from "../../lib/db"


export default function  dashboard(){
    connectDB();
    return(
        <>
        <h1>dashboard</h1>
        </>
    )
}