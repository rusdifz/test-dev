import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginDTO } from './dto/request.dto';

import { LoginRepository } from './login.repository';

@Injectable()
export class LoginService {
    constructor(
        private readonly repository: LoginRepository
    ){}

   async login(props: LoginDTO): Promise<any>{
        
        //cek database
        
        const user = await this.repository.getUser(props.username)
        if(user){
            const isMatchPassword = await bcrypt.compare(props.password, user.password);
            if(isMatchPassword){
                return 'ok'
            }
            return 'wrong password'
        }

        return 'wrong username'
        
   }

    async RegisterUser(payload: any){
    
        const checkUsername = await this.repository.getUser(payload.username)
        
        if(checkUsername){
            throw new HttpException("Username already exist", HttpStatus.BAD_REQUEST);
        }

        const checkEmail = await this.repository.checkEmail(payload.email)
        if(checkEmail){
            throw new HttpException("Email already exist", HttpStatus.BAD_REQUEST);
        }

        payload.password = await bcrypt.hash(payload.password, 10)

        //save db
        await this.repository.createUser(payload)
        delete payload.password

        return payload
    }

}
