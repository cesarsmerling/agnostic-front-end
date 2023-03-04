import { z } from "zod";
export var LocalSchema = z.object({
    id: z.string(),
    name: z.string(),
    location: z.string(),
});
