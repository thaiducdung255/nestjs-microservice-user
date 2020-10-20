import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

enum UserStatus {
  ACTIVE,
  INACTIVE
}

@Schema()
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
    index: true,
    immutable: true,
    lowercase: true
  })
  username: string;

  @Prop({
    required: true
  })
  password: string;

  @Prop({
    required: true
  })
  salt: string;

  @Prop({
    min: 0
  })
  age: number;

  @Prop({
    default: UserStatus.ACTIVE
  })
  status: string
}

export const UserSchema = SchemaFactory.createForClass(User)
