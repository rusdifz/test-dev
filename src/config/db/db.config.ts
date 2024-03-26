import { DbConfigInterface } from './db.interface';
import { Users } from 'src/modules/login/entity/login.entity';
import { ItemEntity } from 'src/modules/item/entity/item.entity';

export const dbConfig = (): DbConfigInterface => ({
    db: {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: true, // disabled for auto migration syncronize
        logging: false,
        entities: [
           Users,
           ItemEntity
        ] 
    },
});
