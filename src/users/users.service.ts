import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { createUserDto, updateUserDto } from './users.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(user: createUserDto) {
    const { username, email, password } = user;
    const isUserExist = await this.userModel.findOne({
      where: {
        username,
      },
    });
    if (isUserExist) {
      throw new HttpException(
        'User with this username already exists',
        HttpStatus.CONFLICT,
      );
    }
    const newUser: Partial<User> = {
      username,
      password,
      email,
    };
    const createdUser = await this.userModel.create(newUser);
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
      include: ['profile'],
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
  async update(userData: updateUserDto, id: number) {
    await this.findOne(id);

    await this.userModel.update(
      { ...userData },
      {
        where: {
          id,
        },
      },
    );
    const user = await this.findOne(id);
    return user;
  }

  async destroy(id: number) {
    try {
      const user = await this.findOne(id);
      await user.destroy();
      return { deleted: true, user };
    } catch (error) {
      throw error;
    }
  }

  async softDestroy(id: number) {
    try {
      const user = await this.findOne(id);
      await user.update({ isActive: false });
      return { inactivated: true, user };
    } catch (error) {
      throw error;
    }
  }
  async restore(id: number) {
    try {
      const user = await this.findOne(id);
      await user.update({ isActive: true });
      return { activated: true, user };
    } catch (error) {
      throw error;
    }
  }
  async createProfile(id: number, profileData: any) {
    const user = await this.findOne(id);
    const profile = await user.$create('profile', profileData);
    return profile;
  }
}
