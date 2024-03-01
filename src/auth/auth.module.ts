import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { getJwtConfig } from 'src/config/jwt.config';

@Module({
   imports: [
      UserModule,
      ConfigModule,
      JwtModule.registerAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: getJwtConfig,
      }),
   ],
   controllers: [AuthController],
   providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
