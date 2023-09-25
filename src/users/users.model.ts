import { DataTypes } from "sequelize";
import { Column, Table, Model, HasMany } from "sequelize-typescript";
import { Product } from "src/products/produts.model";

@Table({ tableName: "users" })
export class User extends Model<User> {
  @Column({
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  firstName: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  password: string;

  @Column({ type: DataTypes.STRING, defaultValue: "customer" })
  role: string;

  @HasMany(() => Product)
  produtc: Product[];
}
