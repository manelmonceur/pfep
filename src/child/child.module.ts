import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';
import { ChildController } from './child.controller';
import { ChildService } from './child.service';

@Module({
  controllers: [ChildController],
  providers: [ChildService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
  exports: [ChildService],
})
export class ChildModule {}
