import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    name: 'name',
    description: 'The name of a user',
    example: 'John Doe',
    required: true,
  })
  name: string;

  @ApiProperty({
    name: 'email',
    description: 'The email of a user',
    example: 'example@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'The password of a user',
    example: 'Password@123',
    required: true,
  })
  password: string;

  @ApiProperty({
    name: 'age',
    description: 'The age of a user',
    example: 25,
    required: true,
  })
  age: number;
}
