import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs'

import FindUsersDto from "./dto/find-users.dto"
@Injectable()
export class UsersService {
   constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
   ) {}

  async create( dto:CreateUserDto):Promise<User>{
    const {username,password,name}=dto;

    const salt=await bcrypt.genSalt();
    const hashedPassword =await bcrypt.hash(password,salt);

    const user =this.usersRepository.create({
      username,
      password:hashedPassword,
      name
  
    });

    const newUser =await this.usersRepository.save(user);
    delete newUser.password;
    return newUser;
  }

  async findMany  (dto:FindUsersDto){
    return this.usersRepository.createQueryBuilder('user').getMany();
  
  }

  async findOne(
    username: string ,
    selectSecrets: boolean=false,
  ): Promise<User | undefined>{
    return this.usersRepository.findOne({
      where:{username},
      select:{
        id:true,
        username:true,
        name:true,
        accountStatus:true,
        password:selectSecrets,
      },
    
    
    
    });
  }
}
