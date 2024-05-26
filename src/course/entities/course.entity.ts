// course.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Child } from 'src/child/entities/child.entity';
import { User } from 'src/user/entities/user.entity';

export type CourseDocument = Course & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Course {
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  teacher: Types.ObjectId;

  @Prop({ required: true, type: [Types.ObjectId], ref: Child.name })
  children: [Types.ObjectId];

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  path: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
