import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { query } from 'express';
import FindUsersDto from './dto/find-users.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
 

  @Get()
  findMany(@Query() query:FindUsersDto){
    return this.usersService.findMany(query);
  }

  @Get('profile')
  getProfile(@CurrentUser() user:User){
  return user;
  }

}