import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './users.model';

@Table({ tableName: 'profiles', timestamps: true })
export class Profile extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  @Column
  firstname: string;
  @Column
  lastname: string;
  @Column
  cellphone: string;
  @Column({ allowNull: true })
  city: string;
  @Column
  birth_date: Date;
  @ForeignKey(() => User)
  user_id: number;
  @BelongsTo(() => User)
  user: User;
}
