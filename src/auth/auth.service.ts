import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './auth-dto/register-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './auth-dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';



@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ){}


  /**
   * 1- check the user information if already exits by email or full_name.
   * 2- if not exists before it will create the user.
   * @param registerUserDto 
   * @returns 
   */
 async create(registerUserDto: RegisterUserDto) {
    try {
      const checkIfUserExists = await this.userModel.findOne({
        $or: [{email: registerUserDto.email}, {full_name: registerUserDto.full_name}]
      });

      if(!checkIfUserExists)
      {
        const registerdUser = new this.userModel({
          ...registerUserDto,
          password: await bcrypt.hash(registerUserDto.password, 10)
        });
        return registerdUser.save();
      }

      throw new ConflictException('full name or email is already exists!')
    } catch (err) {
      if(err instanceof ConflictException){
        throw err;
      }
      throw new BadRequestException('Something went wrong, please try again later!')
    }
  }

  /**
   * 1- find the user depending on the email and password.
   * 2- check the password if it is correct or not.
   * 3- generate access token depending on the user_id and the email.
   * 4- send request to the JWT service to store the token.
   * @param loginUserDto 
   * @returns 
   */
  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.userModel.findOne({
        email: loginUserDto.email
      })
      if(!user){
        throw new NotFoundException('Email not exists in our data');
      }
      const isMatchPassword = await bcrypt.compare(loginUserDto.password, user.password)
      
      if(!isMatchPassword) {
        throw new UnauthorizedException('Password do not match with this accout!');
      }

      let payload = {id: user.id, email: user.email};
      
      const accessToken = await this.jwtService.signAsync(payload);
     
      const response = await this.saveToJwtService(payload, accessToken);
      
      if (response.status === false) {
        throw new BadRequestException('Something went wrong, Please try again later!');
      }

      return {
        user: user,
        access_token: accessToken,
        response: response
      }

    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }

      if(error instanceof UnauthorizedException){
        throw error;
      }
      
      throw new BadRequestException('Something went wrong, Please try again later!');
    }
  }


  /**
   * 1- this funtion is to connect to the JWT service.
   * @param payload 
   * @param accessToken 
   * @returns 
   */
  async saveToJwtService(payload: { id: string; email: string; }, accessToken: string) {
    const connectionKey = await bcrypt.hash(this.configService.get<string>('CONNECTION_KEY_BETWEEN_SERVICE'), 10);
    const url = this.configService.get<string>('JWT_SERVICE_URL');
    const payloadBody = {...payload, jwt: accessToken, secret_key:connectionKey};
    const sendingRequestResult = await axios.post(url + 'jwt/save', payloadBody, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    return sendingRequestResult.data;
  }
}
