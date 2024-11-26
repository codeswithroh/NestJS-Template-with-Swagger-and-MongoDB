import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/user/user.schema';
import { LoginUserDto } from './dto/auth.dto';
import { ApiResponseType } from 'src/utils/response.util';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'User logged in.', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: LoginUserDto })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<ApiResponseType> {
    return await this.authService.login(loginUserDto);
  }
}
