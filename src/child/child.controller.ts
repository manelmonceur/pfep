import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ChildService } from './child.service';
import { CreateChildDto } from './child.dto';
import { UserDocument } from '../user/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Controller('child')
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @Post()
  create(@Req() req: Request, @Body() createChildDto: CreateChildDto) {
    const token = req.headers.authorization?.split(' ')[1];
    const user = jwt.verify(token, process.env.TOKEN_SECRET) as UserDocument;

    return this.childService.create(user._id, createChildDto as any);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    const user = jwt.verify(token, process.env.TOKEN_SECRET) as UserDocument;

    return this.childService.findAll(user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.childService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.childService.remove(id);
  }
}
