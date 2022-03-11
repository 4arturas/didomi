import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { DatabaseModule } from './database/database.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users/entities/user.entity";
import {Event} from "./events/entities/event.entity";
require('dotenv').config();

const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT)
const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: POSTGRES_HOST,
      port: POSTGRES_PORT,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DATABASE,
      entities: [User, Event],
      synchronize: true,
      logging: true
    }),
      UsersModule, EventsModule, DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
