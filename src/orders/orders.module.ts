import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "src/products/produts.model";
import { User } from "src/users/users.model";
import { Order } from "./orders.model";
import { ProductsModule } from "src/products/products.module";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [SequelizeModule.forFeature([Product, User, Order]), ProductsModule],
})
export class OrdersModule {}
