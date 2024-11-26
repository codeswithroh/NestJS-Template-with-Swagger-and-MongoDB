import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrpt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponseType, createApiResponse } from 'src/utils/response.util';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<ApiResponseType> {
    try {
      createUserDto.password = await bcrpt.hash(createUserDto.password, 10);
      const user = new this.userModel({ ...createUserDto });
      return createApiResponse({
        statusCode: 201,
        data: await user.save(),
        message: 'User created successfully',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async fetchUsersByName(name: String): Promise<ApiResponseType> {
    try {
      const users = await this.userModel
        .find({ name: { $regex: name } })
        .exec();
      return createApiResponse({
        statusCode: 200,
        data: users,
        message: 'Users fetched successfully',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).select('+password');
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ApiResponseType> {
    try {
      const userExists = await this.userModel.exists({ _id: id });
      if (!userExists) {
        return createApiResponse({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
        });
      }
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
      return createApiResponse({
        statusCode: 200,
        data: user,
        message: 'User updated successfully',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string): Promise<ApiResponseType> {
    try {
      const userExists = await this.userModel.exists({ _id: id });
      if (!userExists) {
        return createApiResponse({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
        });
      }
      await this.userModel.findByIdAndDelete(id);
      return createApiResponse({
        statusCode: 200,
        message: 'User deleted successfully',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
