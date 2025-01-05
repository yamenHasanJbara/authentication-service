import { Exclude, Expose, Transform } from "class-transformer";
import { UserGender } from "../enum/user-gender.enum";

export class UserSerializerWithJwt{
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

  @Expose()
  access_token: string

  constructor(partial: any) {
    this.id = partial.user._id.toString();
    this.full_name = partial.user.full_name;
    this.gender = partial.user.gender;
    this.email = partial.user.email;
    this.access_token = partial.access_token;
  }
}