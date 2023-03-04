import { z } from "zod";

export const LocalSchema = z.object({
  id: z.string(),
  name: z.string().trim(),
  location: z.string().trim(),
});

export const LocalsSchema = z.array(LocalSchema);

export type LocalDTO = z.infer<typeof LocalSchema>;
