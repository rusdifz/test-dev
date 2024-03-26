import { 
    Controller,
    Post,
    Body, 
    UseInterceptors
 } from '@nestjs/common';

import { ResponseInput } from '../../middleware/interceptor/response-success.interceptor'

import { LoginDTO } from './dto/request.dto';

import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(
        private readonly service: LoginService
    ){}

    @UseInterceptors(ResponseInput)
    @Post('')
    async login(@Body() body: LoginDTO ){
        return await this.service.login(body)
    }

    @UseInterceptors(ResponseInput)
    @Post('register')
    async register(@Body() body: any ){
        return await this.service.RegisterUser(body)
    }

}
