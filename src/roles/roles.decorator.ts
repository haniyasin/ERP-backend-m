import { SetMetadata } from '@nestjs/common';
import { RolesName } from './constants';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesName[]) => SetMetadata(ROLES_KEY, roles);
