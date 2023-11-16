import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  @Column({ unique: true })
  username: string;
  @Column
  email: string;
  @Column
  password: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
