import {Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {ApiParam, ApiResponse} from "@nestjs/swagger";

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':eventId')
  @ApiParam({
    name: 'eventId',
    required: true,
    description: 'Event identifier',
    type: String
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Event can not be updated.'
  })
  update(@Param('eventId') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto)
        .then( r => {
          return r
        })
        .catch(e => {
          throw new HttpException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: 'Event can not be updated.',
          }, HttpStatus.UNPROCESSABLE_ENTITY);
        });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
