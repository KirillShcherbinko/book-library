import { z } from 'zod';

import { userSchema } from './schemas';

export type TUserSchema = z.infer<typeof userSchema>;
