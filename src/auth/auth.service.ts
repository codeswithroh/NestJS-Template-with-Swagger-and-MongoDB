import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/auth.dto';
import { ApiResponseType, createApiResponse } from 'src/utils/response.util';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<ApiResponseType> {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordMatch = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return createApiResponse({
      statusCode: HttpStatus.OK,
      data: {
        token: token,
      },
    });
  }
}
