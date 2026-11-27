import {z} from "zod";

const loginCheck=z.object({
    email:z.email(),
    password:z.string()
})

export default loginCheck;