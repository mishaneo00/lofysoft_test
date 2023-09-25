import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class OrdersDto {
  @IsString()
  @IsNotEmpty()
  readonly productId: string;

  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsNumber()
  @IsOptional()
  readonly quantity?: number;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
