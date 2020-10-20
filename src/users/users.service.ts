import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from './schemas/user.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { randomBytes } from 'crypto'


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const SALT: string = randomBytes(20).toString('hex')
    const CREATED_USER = new this.userModel({ ...createUserDto, SALT })
    return CREATED_USER.save()
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find()
  }

  async getOne(id: string): Promise<User> {
    const FOUND_USER = await this.userModel.findOne({
      _id: id
    })

    if (FOUND_USER) {
      return FOUND_USER
    }

    throw new NotFoundException(`User #${id} does not exists`)
  }

  async updateOne(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const UPDATED_USER = await this.userModel.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: updateUserDto
      },
      {
        new: true
      }
    )

    if (UPDATED_USER) {
      return UPDATED_USER
    }

    throw new NotFoundException(`User #${id} does not exists`)
  }

  async deleteOne(id: string): Promise<User> {
    const DELETED_USER = await this.userModel.findOneAndDelete({ _id: id })

    if (DELETED_USER) {
      return DELETED_USER
    }

    throw new NotFoundException(`User #${id} does not exists`)
  }
}
