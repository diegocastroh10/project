import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModel } from "./models/product.model";
import { ProductsController } from "./products.controller";
import {ProductsService } from "./products.service";

@Module({
    imports: [SequelizeModule.forFeature([ProductModel])],
    providers: [ProductsService],
    controllers: [ProductsController]
})
export class ProductsModule {}
