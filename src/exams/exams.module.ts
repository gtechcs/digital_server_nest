import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { DatabaseService } from '../sqlite/database.service';

@Module({
  controllers: [ExamsController],
  providers: [ExamsService, DatabaseService],
})
export class ExamsModule {}
