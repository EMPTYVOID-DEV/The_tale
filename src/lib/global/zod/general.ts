import { z } from 'zod';

export const isNumberSchema = z.string().max(1).regex(/^\d$/);
