import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configIndex } from './config'
import { DbModule } from './config/db/db.module';
import { ItemModule } from './modules/item/item.module';

import { LoginModule } from './modules/login/login.module';


@Module({
  imports: [
    ConfigModule.forRoot(configIndex),
    LoginModule,
    ItemModule,
    DbModule
  ]
})
export class AppModule {}
