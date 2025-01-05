import { Exclude, Expose, Transform } from "class-transformer";
import { UserGender } from "../enum/user-gender.enum";

export class UserSerializer{
 @Expose()
  id: string;

  @Expose()
  full_name: string;

  @Expose()
  email: string;

  @Expose()
  @Transform(({ value }) => (value === UserGender.FEMALE ? 'female' :  'male'))
  gender:number;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserSerializer>) {
    Object.assign(this, partial);
  }
}