import { RoleEnumType } from "../Routes/user/userSchemas";

export interface JwtPayload {
  id: string;
  role: RoleEnumType;
  exp: number;
  iat: number;
}
