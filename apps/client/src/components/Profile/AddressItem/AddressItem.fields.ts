export const ADDRESS_FIELDS_MAPPING = [
  {
    label: 'Apartment Number',
    name: 'apt',
    required: false,
    disabled: false,
  },
  {
    label: 'Street',
    name: 'street',
    required: true,
    disabled: false,
  },
  {
    nestedFields: [
      {
        label: 'City',
        name: 'city',
        required: true,
        disabled: true,
        width: '32%',
      },
      {
        label: 'State',
        name: 'state',
        required: true,
        disabled: true,
        width: '31%',
      },
      {
        label: 'Country',
        name: 'country',
        required: true,
        disabled: true,
        width: '31%',
      },
    ],
  },
  {
    label: 'ZIP',
    name: 'zip',
    required: true,
    disabled: false,
    width: '24%',
  },
  {
    label: 'Additional Info',
    name: 'additionalInfo',
    required: false,
    disabled: false,
  },
];
