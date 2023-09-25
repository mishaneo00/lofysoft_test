import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersDto } from "./dto/orders.dto";
import { Response } from "express";

@Controller("orders")
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  async addOrder(@Body() orderDto: OrdersDto, @Res() res: Response) {
    try {
      const order = await this.orderService.addOrder(orderDto);
      return res.json(order);
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
      const orders = await this.orderService.getAllOrders(page, limit);
      return res.json(orders);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Get(":id")
  async getOneOrder(@Res() res: Response, @Param("id") id?: string) {
    try {
      const order = await this.orderService.getOneOrder(id);
      return res.json(order);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
