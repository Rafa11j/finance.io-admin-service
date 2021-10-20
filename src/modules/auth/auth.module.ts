import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@users/users.module';
import { AuthController } from './auth.controller';
import { AuthStrategy } from './auth.strategy';
import { AuthenticateService } from './services/authenticate.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('jwt'),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthenticateService, AuthStrategy],
})
export class AuthModule {}
