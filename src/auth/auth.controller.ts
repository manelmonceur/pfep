import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin')
  async signIn(@Body() credential: { email: string; password: string }) {
    const { email, password } = credential;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(user, process.env.TOKEN_SECRET);

    return { ...user, token };
  }
}
