import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
 
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
    ){}

  async create(data: CreateUserDTO) {

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    console.log(data.password)
    
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async list() {
    return this.userRepository.find();
  }

  async readOne(id: number) {
    await this.exists(id);

    return this.userRepository.findOneBy({id});
  }

  async update(id: number, data: UpdatePutUserDTO) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    return this.userRepository.update(id, data);
  }

  async updatePartial(id: number, data: UpdatePatchUserDTO) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    return this.userRepository.update(id, data);
  }

  async delete(id: number) {
    await this.exists(id);

    return this.delete(id);
  }

  async exists(id: number) {
   
    if(!( await this.userRepository.exist({
      where: {
        id
      }
    }))){
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }
}
