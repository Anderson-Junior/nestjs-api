import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entity/user.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sa12345678',
      database: 'api-hcode',
      entities: [UserEntity],
      synchronize: true,
      logging: true, // <--- Ativa o modo de depuração
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
