import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { UserDto } from "./dto/user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser(userDto: UserDto) {
    const candidate = await this.userModel.findOne({
      where: { email: userDto.email },
    });
    if (candidate) {
      throw new BadRequestException("Користувач з таким email вже існує");
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userModel.create({
      ...userDto,
      password: hashPassword,
    });
    delete user.dataValues.password;
    return user;
  }

  async getAllUsers(page?: number, limit?: number) {
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;
    const users = await this.userModel.findAndCountAll({
      limit,
      offset,
      attributes: { exclude: ["password"] },
    });
    return users;
  }

  async getOneUser(id: string) {
    const user = await this.userModel.findOne({
      where: { id: id },
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new BadRequestException("Користувача не знайдено");
    }
    return user;
  }
}
