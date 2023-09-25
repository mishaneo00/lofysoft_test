import {
  Body,
  Controller,
  Get,
  HttpException,
  Query,
  Post,
  Req,
  Res,
  Param,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { UserRoleGuard } from "./guard/user-role.guard";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(UserRoleGuard)
  @Post()
  async createUser(@Body() userDto: UserDto, @Res() res: Response) {
    try {
      const user = await this.userService.createUser(userDto);
      return res.json(user);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Get()
  async getAllUsers(
    @Res() res: Response,
    @Query("page") page?: number,
    @Query("limit") limit?: number
  ) {
    try {
      const users = await this.userService.getAllUsers(page, limit);
      return res.json(users);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Get(":id")
  async getOneUsers(@Res() res: Response, @Param("id") id: string) {
    try {
      const user = await this.userService.getOneUser(id);
      return res.json(user);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
