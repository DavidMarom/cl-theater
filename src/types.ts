import { z } from 'zod';

const tableFiltersScema = z.object({
    date: z.any().optional(),
});

const paginationSchema = z.object({
    current: z.number().optional(),
    pageSize: z.number().optional(),
    showSizeChanger: z.boolean().optional(),
    pageSizeOptions: z.array(z.string()).optional(),
    defaultPageSize: z.number().optional(),
    defaultCurrent: z.number().optional(),
    total: z.number().optional(),
    position: z.array(z.string()).optional(),
});

const moovieSchema = z.object({
    _id: z.string(),
    title: z.string(),
    date: z.number(),
    seats: z.array(z.string()),
    description: z.string(),
    duration: z.number(),
});

export type TableFiltersType = z.infer<typeof tableFiltersScema>;
export type PaginationType = z.infer<typeof paginationSchema>;
export type MoovieType = z.infer<typeof moovieSchema>;

