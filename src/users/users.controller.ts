import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'
import { User } from './schemas/user.schema'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @MessagePattern({ cmd: 'create-user' })
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto)
  }

  @MessagePattern({ cmd: 'get-all-users' })
  getAll(): Promise<User[]> {
    return this.usersService.getAll()
  }

  @MessagePattern({ cmd: 'get-one-user' })
  getOne(id: string): Promise<User> {
    return this.usersService.getOne(id)
  }

  @MessagePattern({ cmd: 'update-one-user' })
  updateOne(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateOne(id, updateUserDto)
  }

  @MessagePattern({ cmd: 'delete-one-user' })
  deleteOne(id: string): Promise<User> {
    return this.usersService.deleteOne(id)
  }
}
