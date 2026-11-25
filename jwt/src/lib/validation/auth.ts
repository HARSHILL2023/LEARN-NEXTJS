import { z } from "zod";

const usercheckSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(8)
});

export default usercheckSchema;