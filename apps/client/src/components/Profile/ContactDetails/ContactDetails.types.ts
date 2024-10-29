import { User } from '../../../__generated__/types.ts';

type ContactDetailsKeys = 'email' | 'phone' | 'name';
export type ContactDetailsType = Pick<User, ContactDetailsKeys>;
export type ContactDetailsMutationFunction = {
  onUserDetailsChange: (
    key: ContactDetailsKeys,
    value: string | number,
  ) => void;
};

export type ContactDetailsProps = ContactDetailsType &
  ContactDetailsMutationFunction;
