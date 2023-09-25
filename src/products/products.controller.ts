import {
  Body,
  Controller,
  Get,
  HttpException,
  Query,
  Post,
  Res,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductDto } from "./dto/products.dto";
import { Response } from "express";
import { Roles } from "src/products/guard/roles.decorator";
import { RoleGuard } from "./guard/roles.guard";

@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Roles(["vendor"])
  @UseGuards(RoleGuard)
  @Post()
  async createProduct(@Body() productDto: ProductDto, @Res() res: Response) {
    try {
      const product = await this.productService.createProduct(productDto);
      return res.json(product);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Get()
  async getAllProducts(
    @Res() res: Response,
    @Query("page") page?: number,
    @Query("limit") limit?: number
  ) {
    try {
      const products = await this.productService.getAllProducts(page, limit);
      return res.json(products);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Get(":id")
  async getOneProduct(@Res() res: Response, @Param("id") id?: string) {
    try {
      const product = await this.productService.getOneProduct(id);
      return res.json(product);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
