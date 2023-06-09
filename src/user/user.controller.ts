import {
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Delete,
  Body,
  UseInterceptors,
  UseGuards
} from '@nestjs/common';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post()
  async create(@Body() data: CreateUserDTO) {
    const user = await this.userService.create(data);
    return user;
  }

  @Get()
  async read() {
    return this.userService.list();
  }

  @Get(':id')
  async readOne(@ParamId() id) {
    return await this.userService.readOne(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id) {
    return await this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id) {
    return await this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id) {
    return this.userService.delete(id);
  }
}

