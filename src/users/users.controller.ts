import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { createUserDto, updateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() newUser: createUserDto) {
    return this.usersService.createUser(newUser);
  }
  @Patch(':id')
  updateUser(
    @Body() userData: updateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.update(userData, id);
  }
  @Delete(':id/destroy')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.destroy(id);
  }
  @Delete(':id')
  softRemoveUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.softDestroy(id);
  }
  @Patch(':id/restore')
  restoreUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.restore(id);
  }
  @Post(':id/profile')
  createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profileData: any,
  ) {
    return this.usersService.createProfile(id, profileData);
  }
}
