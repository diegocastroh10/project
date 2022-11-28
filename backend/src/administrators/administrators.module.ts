import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdministratorModel } from "./models/administrator.model";
import { AdministratorsController } from "./administrators.controller";
import { AdministratorsService } from "./administrators.service";

@Module({
    imports: [SequelizeModule.forFeature([AdministratorModel])],
    controllers:[AdministratorsController],
    providers: [AdministratorsService],
})
export class AdministratorsModule {}
