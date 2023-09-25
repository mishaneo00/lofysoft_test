import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { ProductsModule } from "./products/products.module";
import { Product } from "./products/produts.model";
import { OrdersModule } from "./orders/orders.module";
import { Order } from "./orders/orders.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Product, Order],
      autoLoadModels: true,
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
