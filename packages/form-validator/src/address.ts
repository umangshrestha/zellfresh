import { z } from 'zod';

export const AddressSchema = z.object({
  apt: z
    .string({
      message: 'Invalid apartment',
    })
    .default(''),
  street: z.string({
    message: 'Invalid street',
  }),
  city: z.string({
    message: 'Invalid city',
  }),
  state: z.string({
    message: 'Invalid state',
  }),
  zip: z.string({
    message: 'Invalid zip',
  }),
  additionalInfo: z
    .string({
      message: 'Invalid additional info',
    })
    .default(''),
  country: z.string({
    message: 'Invalid country',
  }),
});

export type AddressType = z.infer<typeof AddressSchema>;
