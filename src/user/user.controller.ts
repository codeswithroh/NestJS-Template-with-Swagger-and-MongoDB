import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponseType } from 'src/utils/response.util';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Register a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post('register')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponseType> {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Fetch users by name' })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully.',
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiQuery({ name: 'name', required: true, type: String })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Get()
  async fetchUsersByName(
    @Query('name') name: string,
  ): Promise<ApiResponseType> {
    return this.userService.fetchUsersByName(name);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponseType> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<ApiResponseType> {
    return this.userService.deleteUser(id);
  }
}
