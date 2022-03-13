  import {Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException} from '@nestjs/common';
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User was successfully added.'
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'User can not be added.'
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
        .then(u => {
          return u;
        } )
        .catch(e => {
          throw new HttpException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: 'User can not be added.',
          }, HttpStatus.UNPROCESSABLE_ENTITY);
        });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Users have been successfully fetched',
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
    status: HttpStatus.OK,
    description: 'User has been successfully fetched',
    type: ReturnUserDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'A user with given id does not exist.',
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
