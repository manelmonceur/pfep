import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UserDocument } from 'src/user/entities/user.entity';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Req() req: Request,
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const token = req.headers.authorization?.split(' ')[1];
    const user = jwt.verify(token, process.env.TOKEN_SECRET) as UserDocument;

    const result = await this.courseService.uploadFile(file);

    return this.courseService.create({
      ...createCourseDto,
      teacher: user._id,
      path: result.secure_url,
    });
  }

  @Get()
  findAll(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    const user = jwt.verify(token, process.env.TOKEN_SECRET) as UserDocument;

    return this.courseService.findByTeacher(user._id);
  }

  @Get('child/:id')
  findByChild(@Param('id') id: string) {
    return this.courseService.findByChild(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
