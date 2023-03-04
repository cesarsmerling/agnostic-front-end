import { z } from "zod";
export declare const LocalSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    location: z.ZodString;
}, "strip", z.ZodTypeAny, {
    location?: string;
    id?: string;
    name?: string;
}, {
    location?: string;
    id?: string;
    name?: string;
}>;
