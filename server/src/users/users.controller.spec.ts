import {User} from "./entities/user.entity";
import { Repository} from "typeorm";
import {UsersService} from "./users.service";
import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "./users.module";
import {Event} from "../events/entities/event.entity";

describe('UserController (e2e)', () => {
  let userService: UsersService;
  let userRepository: Repository<User>;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ':memory:',
          synchronize: true,
          entities: [User, Event]
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    userRepository = moduleFixture.get('UserRepository');
    userService = new UsersService(userRepository);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await userRepository.query('DELETE FROM users');
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });
});