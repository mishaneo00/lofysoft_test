import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "./orders.model";
import { OrdersDto } from "./dto/orders.dto";
import { User } from "src/users/users.model";
import { ProductsService } from "src/products/products.service";
import * as bcrypt from "bcrypt";
import { Product } from "src/products/produts.model";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(User) private userModel: typeof User,
    private productService: ProductsService
  ) {}

  async addOrder(orderDto: OrdersDto) {
    const user = await this.userModel.findByPk(orderDto.userId);
    if (!user) {
      throw new BadRequestException("Користувача не знайдено");
    }
    const comparePass = await bcrypt.compare(orderDto.password, user.password);
    if (!comparePass) {
      throw new ForbiddenException("Невірний пароль");
    }
    const product = await this.productService.getOneProduct(orderDto.productId);
    if (orderDto.userId === product.userId) {
      throw new ForbiddenException("Неможливо замовити свій продукт");
    }
    const order = await this.orderModel.create({
      productId: orderDto.productId,
      userId: orderDto.userId,
      quantity: orderDto.quantity,
    });
    const orderWithUserAndProduct = await this.orderModel.findOne({
      where: { id: order.id },
      include: [
        {
          model: Product,
          include: [{ model: User, attributes: { exclude: ["password"] } }],
        },
        { model: User, attributes: { exclude: ["password"] } },
      ],
    });
    return orderWithUserAndProduct;
  }

  async getAllOrders(page?: number, limit?: number) {
    let newPage = page || 1;
    let newLimit = limit || 10;
    console.log(page, limit);

    let offset = newPage * newLimit - newLimit;
    const orders = await this.orderModel.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: Product,
          include: [{ model: User, attributes: { exclude: ["password"] } }],
        },
        { model: User, attributes: { exclude: ["password"] } },
      ],
    });
    return orders;
  }

  async getOneOrder(id: string) {
    const order = await this.orderModel.findOne({
      where: { id: id },
      include: [
        {
          model: Product,
          include: [{ model: User, attributes: { exclude: ["password"] } }],
        },
        { model: User, attributes: { exclude: ["password"] } },
      ],
    });
    if (!order) {
      throw new BadRequestException("Продукт не знайдено");
    }
    return order;
  }
}
