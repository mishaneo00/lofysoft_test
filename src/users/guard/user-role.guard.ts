import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class UserRoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      if (req.body.role) {
        if (
          req.body.role === "customer" ||
          req.body.role === "vendor" ||
          req.body.role === "admin"
        ) {
          return true;
        } else {
          throw new BadRequestException("Такої ролі не існує");
        }
      }
      return true;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
