import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
  exports: [CourseService],
})
export class CourseModule {}
