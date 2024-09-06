import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.userService.create(createUserDto, res);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('/login')
  findOne(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.userService.findOne(createUserDto, res);
  }

  @Post('/logout')
  logout(@Res() res: Response) {
    return this.userService.logout(res);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
