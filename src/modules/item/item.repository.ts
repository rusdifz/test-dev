import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    FindManyOptions,
    Repository,
} from 'typeorm';

import { ItemEntity } from './entity/item.entity';

@Injectable()
export class ItemRepository {
    constructor(
        @InjectRepository(ItemEntity) private readonly items: Repository<ItemEntity>
    ){}

    async getItems(props: any){
        
       const option:FindManyOptions<ItemEntity> = {
           where: {
               username: props.username,
               type: props.item
           }
       }

       return await this.items.find(option)

    }

}
