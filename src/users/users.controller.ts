import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() newUser: createUserDto) {
    return this.usersService.createUser(newUser);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    this.usersService.remove(id);
    return `User with id ${id} has been deleted`;
  }
}
