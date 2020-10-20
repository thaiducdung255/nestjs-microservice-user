import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    description: 'user unique identifier',
    required: true,
    type: String
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'password for login',
    required: true,
    type: String
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'user age',
    type: Number,
    required: false
  })
  age: number;
}
