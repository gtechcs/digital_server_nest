import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { DatabaseService } from '../sqlite/database.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, DatabaseService],
})
export class QuestionsModule {}
