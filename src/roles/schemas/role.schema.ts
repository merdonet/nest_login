import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RoleType } from '../enums/role.enum';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({ required: true, unique: true, enum: RoleType })
  name: RoleType;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

// Add static method to check and create default roles
RoleSchema.statics.ensureDefaultRoles = async function () {
  const defaultRoles = [
    {
      name: RoleType.ADMIN,
      description: 'Administrator with full access',
    },
    {
      name: RoleType.USER,
      description: 'Regular user with basic access',
    },
    {
      name: RoleType.MODERATOR,
      description: 'Moderator with elevated access',
    },
  ];

  for (const role of defaultRoles) {
    await this.findOneAndUpdate(
      { name: role.name },
      { $setOnInsert: role },
      { upsert: true, new: true },
    );
  }
};
