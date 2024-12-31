import { IsEnum, IsString, IsOptional } from 'class-validator';
import { RoleType } from '../enums/role.enum';

export class CreateRoleDto {
  @IsEnum(RoleType)
  name: RoleType;

  @IsString()
  @IsOptional()
  description?: string;
}
