import { DataTypes } from "sequelize";
import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Order } from "src/orders/orders.model";
import { User } from "src/users/users.model";

@Table({ tableName: "products" })
export class Product extends Model<Product> {
  @Column({
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  name: string;

  @Column({ type: DataTypes.INTEGER, allowNull: false })
  price: number;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Order)
  order: Order[];
}
