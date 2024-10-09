export const Role = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

export type RoleType = (typeof Role)[keyof typeof Role];
