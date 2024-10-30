import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { z } from 'zod';

export const ContactDetailsSchema = z.object({
  name: z.string({
    message: 'Invalid name',
  }),
  email: z.string().email({
    message: 'Invalid email address',
  }),
  phone: z.string().refine(
    (phoneNumber) => {
      const parsedNumber = parsePhoneNumberFromString(phoneNumber, 'IN');
      return parsedNumber && parsedNumber.isValid();
    },
    {
      message: 'Invalid phone number.',
    },
  ),
});
