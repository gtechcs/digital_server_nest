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

  create(qData: CreateQuestionDto) {
    try {
      const db = this.databaseService.getDb()
      const result = this.databaseService.executeInsert(
        `INSERT INTO questions ( domain, subject, question,
          A, B, C, D,
          paragraph, explanation, answer, difficulty)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [qData.domain, qData.subject, qData.question,
          qData.A, qData.B, qData.C, qData.D,
          qData.paragraph, qData.explanation, qData.answer, qData.difficulty
        ]
      );

      let lastInsertRowid = result.lastInsertRowid
      return this.findOne(lastInsertRowid);
    } catch (error) {
      console.error('Error creating test:', error);
      throw new Error('Failed to create test');
    }
  }

//  update(testid: number, moduleid: number, updateExamDto: UpdateExamDto) {
  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    try {
      const db = this.databaseService.getDb()
      const result = this.databaseService.executeUpdate(
        `UPDATE questions SET domain = ?, subject = ?, question = ?,
        A = ?,  B = ?,  C = ?,  D = ?,
        paragraph = ?, explanation = ?, answer = ?, difficulty = ?
        WHERE questionid = ? `,
        [updateQuestionDto.domain, updateQuestionDto.subject, updateQuestionDto.question,
          updateQuestionDto.A, updateQuestionDto.B, updateQuestionDto.C, updateQuestionDto.D,
          updateQuestionDto.paragraph ,updateQuestionDto.explanation , updateQuestionDto.answer , updateQuestionDto.difficulty,
          id
        ]
      );

      return this.findOne(id);
    } catch (error) {
      console.error('Error updating question:', error);
      throw new Error('Failed to update question');
    }
  }

  remove(id: number) {
    try {
      const db = this.databaseService.getDb()
      const result = this.databaseService.executeDelete(
      'DELETE from questions WHERE questionid = ?',
        [id]
      );

      // Todo: Is this correct return
      return "Question removed"
    } catch (error) {
      console.error('Error removing question:', error);
      throw new Error('Failed to remove question');
    }

  }
}
