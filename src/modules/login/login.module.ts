import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoginRepository } from './login.repository';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

import { Users } from './entity/login.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Users ]),
  ],
  providers: [LoginService, LoginRepository],
  controllers: [LoginController]
})
export class LoginModule {}
