import {
  Body,
  Controller,
  Post,
  Headers,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { writeFile } from 'fs';
import { join } from 'path';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthCrontoller {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDto) {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDto) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user) {
    return {user}
  }

  //   @UseInterceptors(FileInterceptor('file'))
  //   @Post('photo')
  //   async uploadPhoto(@UploadedFile() photo: Express.Multer.File) {
  //     const result = await writeFile(
  //       join(__dirname, '..', '..', 'storage', 'photos', 'photo-user.png'),
  //       photo.buffer,
  //     );
  //     return { result };
  //   }
}
