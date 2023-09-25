import { DataTypes } from "sequelize";
import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Product } from "src/products/produts.model";
import { User } from "src/users/users.model";

@Table({ tableName: "orders" })
export class Order extends Model<Order> {
  @Column({
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @Column({ type: DataTypes.INTEGER, defaultValue: 1 })
  quantity: number;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.UUID })
  userId: string;

  @ForeignKey(() => Product)
  @Column({ type: DataTypes.UUID })
  productId: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;
}
