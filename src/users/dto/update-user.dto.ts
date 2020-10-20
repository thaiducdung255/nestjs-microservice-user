import { IsNotEmpty } from 'class-validator'

export class UpdateUserDto {
  @IsNotEmpty()
  age: number;
}
