import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = new this.roleModel(createRoleDto);
    return createdRole.save();
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async findById(id: string): Promise<Role> {
    return this.roleModel.findById(id).exec();
  }
}