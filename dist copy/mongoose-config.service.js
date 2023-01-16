"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let MongooseConfigService = class MongooseConfigService {
    constructor(config) {
        this.config = config;
    }
    createMongooseOptions() {
        const username = this.config.get('DATABASE_USERNAME');
        const password = this.config.get('DATABASE_PASSWORD');
        const database = this.config.get('DATABASE_NAME');
        const host = this.config.get('DATABASE_HOST');
        const port = this.config.get('DATABASE_PORT');
        const envType = this.config.get('NODE_ENV');
        const uri = envType === 'local'
            ? `mongodb://localhost:${port}/${database}`
            : `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`;
        return {
            uri,
        };
    }
};
MongooseConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MongooseConfigService);
exports.MongooseConfigService = MongooseConfigService;
//# sourceMappingURL=mongoose-config.service.js.map