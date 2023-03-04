import { z } from "zod";
export var LoginSchema = z.object({
    email: z.string(),
    password: z.string(),
});
