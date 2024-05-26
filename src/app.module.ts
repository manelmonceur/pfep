import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ChildModule } from './child/child.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    UserModule,
    ChildModule,
    CourseModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
