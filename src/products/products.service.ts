import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./produts.model";
import { ProductDto } from "./dto/products.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { User } from "src/users/users.model";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(User) private userModel: typeof User
  ) {}

  async createProduct(productDto: ProductDto) {
    const user = await this.userModel.findByPk(productDto.userId);
    const comparePass = await bcrypt.compare(
      productDto.password,
      user.password
    );
    if (!comparePass) {
      throw new ForbiddenException("Невірний пароль");
    }
    const product = await this.productModel.create({
      name: productDto.name,
      price: productDto.price,
      userId: productDto.userId,
    });
    const productWithUser = await this.productModel.findOne({
      where: { id: product.id },
      include: [{ model: User, attributes: { exclude: ["password"] } }],
    });
    return productWithUser;
  }

  async getAllProducts(page?: number, limit?: number) {
    let newPage = page || 1;
    let newLimit = limit || 10;
    console.log(page, limit);

    let offset = newPage * newLimit - newLimit;
    const products = await this.productModel.findAndCountAll({
      limit,
      offset,
      include: [{ model: User, attributes: { exclude: ["password"] } }],
    });
    return products;
  }

  async getOneProduct(id: string) {
    const product = await this.productModel.findOne({
      where: { id: id },
      include: [{ model: User, attributes: { exclude: ["password"] } }],
    });
    if (!product) {
      throw new BadRequestException("Продукт не знайдено");
    }
    return product;
  }
}
