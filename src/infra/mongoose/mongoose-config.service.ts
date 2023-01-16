import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    const username = this.config.get('DATABASE_USERNAME');
    const password = this.config.get('DATABASE_PASSWORD');
    const database = this.config.get('DATABASE_NAME');
    const host = this.config.get('DATABASE_HOST');
    const port = this.config.get('DATABASE_PORT');
    const envType = this.config.get('NODE_ENV');
    const uri =
      envType === 'local'
        ? `mongodb://localhost:${port}/${database}`
        : `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`;
    return {
      uri,
    };
  }
}
