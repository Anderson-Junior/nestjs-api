import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthCrontoller } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'E9kA50q24^b3SJC^yXz5nGdCqa2pe@3m',
    }),
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => UserModule)
  ],
  controllers: [AuthCrontoller],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
