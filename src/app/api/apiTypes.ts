import { z } from "zod";

const MoviesGetSchema = z.object({
    params: z.object({
        _id: z.string(),
        title: z.string(),
        date: z.string(),
        seats: z.object({}),
        description: z.string(),
        duration: z.number(),
    })
});

export type MovieGetType = z.infer<typeof MoviesGetSchema>;
