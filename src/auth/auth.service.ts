import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
    ){}

  createToken(user: UserEntity) {
    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        name: user.name,
        email: user.email
      },
      {
        expiresIn: "7 days",
        subject: String(user.id),
        issuer: "login",
        audience: "users"
      }
      )
    }
  }

  checkToken(token: string) {
    try{
      const data = this.jwtService.verify(token, {
        audience: "users",
        issuer: "login"
      });
      return data;

    }catch(e){
      throw new BadRequestException(e);
    }
   
  }

  isValidToken(token: string){
    try{
      this.checkToken(token);
      return true;
    }catch(e){
      return false;
    }
  }
  async login(email: string, password: string) {
      const user = await this.userRepository.findOne({
        where: {
          email
        }
      })

      if(!user){
        throw new UnauthorizedException('E-mail e/ou senha incorretos.');
      }

      // if(! await bcript.compare(password, (await user).password)){
      //   throw new UnauthorizedException('E-mail e/ou senha incorretos.');
      // }

      return await this.createToken(user);
  }

  async forget(email: string) {
      const user = this.userRepository.findOneBy({
          email
      })
      if(!user){
        throw new UnauthorizedException('E-mail incorreto.');
      }
    // to do: Enviar o e-mail...
      return true;
  }

  async reset(password: string, token: string) {
    // to do: Validar o token
    const id = 0;
    await this.userRepository.findOneBy({
      id
    });

    // const user = this.userRepository.update(id, password);

    // return await this.createToken(user);
  }

  async register(data: AuthRegisterDto){
    const user = await this.userService.create(data);

    return await this.createToken(user);
  }
}
