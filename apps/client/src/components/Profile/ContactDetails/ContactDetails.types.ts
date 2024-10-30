import { z } from 'zod';
import { ContactDetailsSchema } from './ContactDetails.schema.ts';

export type ContactDetailsType = z.infer<typeof ContactDetailsSchema>;
export type ContactDetailsMutationFunction = {
  onSave: (obj: ContactDetailsType) => void;
};

export type ContactDetailsProps = ContactDetailsType &
  ContactDetailsMutationFunction;
