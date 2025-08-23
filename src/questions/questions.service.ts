import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { DatabaseService } from '../sqlite/database.service';

export interface Question {
  questionidid: number;
  legacyid: string;
  domain: string;
  subject: string;
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  paragraph: string;
  explanation: string;
  answer: string;
  selected: string;
  difficulty: string;
}

@Injectable()
export class QuestionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Question[] {
    try {
      const rows = this.databaseService.findAll('questions');
      return rows;
    } catch (error) {
      console.error('Error retrieving all questions:', error);
      throw new Error('Failed to retrieve questions');
    }
  }

  findOne(id: number): Question {
    try {
      const db = this.databaseService.getDb();
      const stmt = db.prepare(`SELECT * FROM questions WHERE questionid = ?`);
      return stmt.get(id);
    } catch (error) {
      console.error(`Error finding record in questions with id ${id}:`, error);
      throw error;
    }
  }

  create(createQuestionDto: CreateQuestionDto) {
    return 'This action adds a new question';
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
