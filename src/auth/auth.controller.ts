import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './auth-dto/register-user.dto';
import { UserSerializer } from './serializer/user-register.serializer';
import { LoginUserDto } from './auth-dto/login-user.dto';
import { UserSerializerWithJwt } from './serializer/user-login.serializer';


@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async create(@Body() registerUserDto: RegisterUserDto): Promise<UserSerializer> {
    const user =  await this.authService.create(registerUserDto);
    return new UserSerializer(user.toJSON());
  }



  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserSerializerWithJwt> {
      const userDataWithJwt = await this.authService.login(loginUserDto);
      return new UserSerializerWithJwt(userDataWithJwt);
  }
}
