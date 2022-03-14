import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ReturnUserDto} from "./dto/return-user.dto";
import {Event} from "../events/entities/event.entity";

@Injectable()
export class UsersService {

  constructor(
      @InjectRepository(User) private usersRepository: Repository<User>,
      @InjectRepository(Event) private eventsRepository: Repository<Event>,

  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save({ ...createUserDto });
  }

  findAll(): Promise<ReturnUserDto[]> {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne(id);
    await this.eventsRepository.remove(user.consents);
    return this.usersRepository.remove(user);
  }
}
