import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdministratorsModule } from './administrators/administrators.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';  

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'fooddy',
      password: 'f00ddy',
      database: 'fooddy',
      autoLoadModels: true,
      synchronize: true,
    }),
    AdministratorsModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
