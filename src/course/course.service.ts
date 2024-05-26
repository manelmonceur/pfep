import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './entities/course.entity';
import { Model } from 'mongoose';
import { cloudinary } from 'src/libs/cloudinary.config';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
  ) {}

  create(createCourseDto: CreateCourseDto & { teacher: string }) {
    return this.courseModel.create(createCourseDto);
  }

  findByTeacher(id: string) {
    return this.courseModel.find({ teacher: id }).lean();
  }
  findByChild(id: string) {
    return this.courseModel.find({ children: id }).lean();
  }

  findOne(id: string) {
    return this.courseModel.findById(id).lean();
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.courseModel.updateOne({ _id: id }, updateCourseDto);
  }

  remove(id: string) {
    return this.courseModel.deleteOne({ _id: id });
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        })
        .end(file.buffer);
    });
  }
}
