import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { RoleType } from '../../roles/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role' })
  roleId: MongooseSchema.Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({
    type: [String],
    enum: Object.values(RoleType),
    default: [RoleType.USER],
  })
  roles: RoleType[];
}

export const UserSchema = SchemaFactory.createForClass(User);
