import { ContactDetailsType } from '@repo/form-validator';

export type ContactDetailsMutationFunction = {
  onUserDetailsSave: (obj: ContactDetailsType) => Promise<object>;
  onUserSaveLoading: boolean;
};

export type ContactDetailsProps = ContactDetailsType &
  ContactDetailsMutationFunction;
