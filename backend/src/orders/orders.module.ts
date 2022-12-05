import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderModel } from "./models/order.model";
import { OrdersController } from "./orders.controller";
import {OrdersService } from "./orders.service";

@Module({
    imports: [SequelizeModule.forFeature([OrderModel])],
    controllers:[OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
