import { Injectable } from '@nestjs/common';
import { ItemDTO } from './dto/request.dto';
import { ItemsInterface } from './interface/item.interface';

import { ItemRepository } from './item.repository';
import { itemResp } from './response/mapping.response';
@Injectable()
export class ItemService {
    constructor(
        private readonly repository: ItemRepository
    ){}

    async getItems(props: ItemDTO): Promise<ItemsInterface[]>{
        
        const data = await this.repository.getItems(props)

        return data.length > 0 ? await itemResp(data) : []

    }

}
