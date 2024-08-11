// src/schemas/qr.schema.ts
import { z } from 'zod';

export const qrSchema = z.object({
    data: z.string().min(1, 'Data is required'),
});
