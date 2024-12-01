import { RoleType } from '../types/role.enum';

export class Auth {
  sub: string;
  name: string;
  imageUrl?: string;
  email: string;
  role: RoleType;
}
