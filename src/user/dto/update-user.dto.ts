import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    name: 'name',
    description: 'The name of a user',
    example: 'John Doe',
    required: false,
  })
  name: string;

  @ApiProperty({
    name: 'email',
    description: 'The email of a user',
    example: 'example@gmail.com',
    required: false,
  })
  email: string;

  @ApiProperty({
    name: 'age',
    description: 'The age of a user',
    example: 25,
    required: false,
  })
  age: number;
}
