import { Table, Column, Model, HasOne } from 'sequelize-typescript';
import { Profile } from './profiles.model';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column
  password: string;
  @Column({ defaultValue: true })
  isActive: boolean;

  @HasOne(() => Profile)
  profile: Profile;
}
