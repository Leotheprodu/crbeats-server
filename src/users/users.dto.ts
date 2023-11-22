export class createUserDto {
  email: string;
  password: string;
  username: string;
}

export class updateUserDto {
  email?: string;
  password?: string;
  username?: string;
}
