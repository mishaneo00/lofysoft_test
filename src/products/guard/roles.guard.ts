import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "./roles.decorator";
import { UsersService } from "src/users/users.service";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const reqRoles = this.reflector.getAllAndOverride<string[]>(Roles, [
        context.getHandler(),
        context.getClass(),
      ]);
      const req = context.switchToHttp().getRequest();
      const userId: string = req.body.userId;
      const user = await this.userService.getOneUser(userId);
      if (!reqRoles.includes(user.role)) {
        throw new ForbiddenException(
          "Продукт може створити лише користувач з ролью vendor"
        );
      }
      return true;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
