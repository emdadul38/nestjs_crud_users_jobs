import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
export declare class MongooseConfigService implements MongooseOptionsFactory {
    private config;
    constructor(config: ConfigService);
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions>;
}
