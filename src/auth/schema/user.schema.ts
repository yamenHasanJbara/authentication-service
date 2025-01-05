
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserGender } from '../enum/user-gender.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    virtuals: true, // Include virtuals
    versionKey: false, // Exclude `__v`
    transform: (doc, ret) => {
      ret.id = ret._id.toString(); // Replace `_id` with `id`
      delete ret._id; // Remove `_id`
      return ret;
    },
  },
})
export class User{
  @Prop({
        required: true,
        minlength: 6,
        maxlength: 100,
        unique: true
    })
  full_name: string;

  @Prop({
    required: true,
    enum: UserGender,
    default: UserGender.MALE
  })
  gender: UserGender;

  @Prop({
    required: true,
    minlength:8,
    maxlength:255,
    unique:true
  })
  email: string;

  @Prop({
    required:true,
    minlength: 8,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
