import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Event} from "./entities/event.entity";
import {User} from "../users/entities/user.entity";

@Injectable()
export class EventsService {

  constructor(
      @InjectRepository(Event)
      private eventsRepository: Repository<Event>
  ) {}

  async create(createEventDto: CreateEventDto) {
    const user: User = new User();
    user.id = createEventDto.user;
    return this.eventsRepository.save({id: createEventDto.id, enabled: createEventDto.enabled, user: user});
  }

  findAll() {
    return this.eventsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
