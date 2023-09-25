import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./produts.model";
import { User } from "src/users/users.model";
import { UsersModule } from "src/users/users.module";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [SequelizeModule.forFeature([Product, User]), UsersModule],
  exports: [ProductsService],
})
export class ProductsModule {}
