import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    FindOneOptions,
    Repository,
} from 'typeorm';
import { LoginDTO } from './dto/request.dto';

import { Users } from './entity/login.entity';

@Injectable()
export class LoginRepository {
    constructor(
        @InjectRepository(Users) private readonly users: Repository<Users>
    ){}

   async getUser(username: string){
        
        const query:FindOneOptions<Users> = {
            where: {
                username
            }
        }

        return await this.users.findOne(query)

   }

   async checkEmail(email: string){
        
        const query:FindOneOptions<Users> = {
            where: {
                email
            }
        }

        return await this.users.findOne(query)

    }

   async createUser(payload){
    return this.users.save(payload)
   }

}
