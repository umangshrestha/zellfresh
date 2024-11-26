import { z } from 'zod';
import { ContactDetailsSchema } from './ContactDetails.schema.ts';

export type ContactDetailsType = z.infer<typeof ContactDetailsSchema>;
export type ContactDetailsMutationFunction = {
  onUserDetailsSave: (obj: ContactDetailsType) => void;
  onUserSaveLoading: boolean;
};

export type ContactDetailsProps = ContactDetailsType &
  ContactDetailsMutationFunction;
