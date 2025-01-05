import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/usersDB'),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule
  ]
})
export class AppModule {}
