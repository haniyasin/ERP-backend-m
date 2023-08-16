import { SetMetadata } from "@nestjs/common";
import { RolesName } from "./role.enum";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesName[]) => SetMetadata(ROLES_KEY, roles);