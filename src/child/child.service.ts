import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Child, ChildDocument } from './entities/child.entity';
import { Model } from 'mongoose';
import { CreateChildDto } from './child.dto';

@Injectable()
export class ChildService {
  constructor(
    @InjectModel(Child.name)
    private readonly childModel: Model<ChildDocument>,
  ) {}

  async create(parentId: string, child: CreateChildDto) {
    return this.childModel.create({ parent: parentId, ...child });
  }

  findAll(parentId: string) {
    return this.childModel.find({ parent: parentId }).lean();
  }

  findOne(_id: string) {
    return this.childModel.findById(_id).lean();
  }

  remove(_id: string) {
    return this.childModel.deleteOne({ _id });
  }
}
