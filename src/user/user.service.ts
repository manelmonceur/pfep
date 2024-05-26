import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create({ ...createUserDto });
  }

  findAll() {
    return this.userModel.find().lean();
  }

  findOne(_id: string) {
    return this.userModel.findById(_id).lean();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).lean();
  }

  update(_id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id }, updateUserDto);
  }

  remove(_id: string) {
    return this.userModel.deleteOne({ _id });
  }
}
