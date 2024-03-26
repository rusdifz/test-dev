import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemRepository } from './item.repository';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';

import { ItemEntity } from './entity/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ ItemEntity ]),
  ],
  providers: [ItemService, ItemRepository],
  controllers: [ItemController]
})
export class ItemModule {}
