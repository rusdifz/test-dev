import { 
    Controller,
    Get, 
    Query,
    UseInterceptors
 } from '@nestjs/common';

import { ResponseNonPagination } from '../../middleware/interceptor/response-success.interceptor'

import { ItemService } from './item.service';

import { ItemDTO } from './dto/request.dto';

@Controller('item')
export class ItemController {
    constructor(
        private readonly service: ItemService
    ){}

    @UseInterceptors(ResponseNonPagination)
    @Get('')
    async login(@Query() query: ItemDTO){
        return await this.service.getItems(query)
    }

}
