  import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
  import {ApiParam, ApiResponse} from "@nestjs/swagger";
  import {User} from "./entities/user.entity";
  import {ReturnUserDto} from "./dto/return-user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Users has been successfully fetched',
    type: [ReturnUserDto],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a user that exists in the database',
    type: String
  })
  @ApiResponse({
    status: 404,
    description: 'A user with given id does not exist.',
    type: ReturnUserDto
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
