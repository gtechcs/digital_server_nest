import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { DatabaseService } from '../sqlite/database.service';

export interface Exam {
  testid: number;
  moduleid: number;
  name: string;
  module: string;
}

@Injectable()
export class ExamsService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Exam[] {
    try {
      const rows = this.databaseService.findAll('tests');
      console.log('All exams retrieved:', rows.length);
      return rows;
    } catch (error) {
      console.error('Error retrieving all exams:', error);
      throw new Error('Failed to retrieve exams');
    }
  }
  
  findAllModules(id: number): Exam {
    try {
      const db = this.databaseService.getDb()
      const stmt = db.prepare(`SELECT * FROM tests WHERE testid = ?`);
      console.log(stmt.get(id))
      return stmt.all(id);
    } catch (error) {
      console.error(`Error finding record in tests with id ${id}:`, error);
      throw error;
    }
  }

  findOneModule(id: number, moduleid: number): Exam {
    try {
      const db = this.databaseService.getDb()
      const stmt = db.prepare(`SELECT * FROM tests WHERE testid = ? and moduleid = ?`);
      return stmt.get(id, moduleid);
    } catch (error) {
      console.error(`Error finding record in tests with id ${id}:`, error);
      throw error;
    }
  }

  findModuleQuestions(id: number, moduleid: number): Exam {
    try {
      const db = this.databaseService.getDb()
      const stmt = db.prepare(`SELECT t.testid, t.moduleid, q.questionid, q.question,
        q.answer, q.A, q.B, q.C, q.D, q.difficulty, q.domain,
        q.explanation, q.paragraph, q.subject
        FROM tests as t
          inner join tests_questions as tq on t.testid = tq.testid and t.moduleid = tq.moduleid
          inner join questions as q on q.questionid = tq.questionid
          WHERE  t.testid = ? and t.moduleid = ?`
      );
      return stmt.all(id, moduleid);
    } catch (error) {
      console.error(`Error finding question records with id ${id}: ${moduleid}: `, error);
      throw error;
    }
  }

  create(testData ): Exam {
      try {
      const db = this.databaseService.getDb()
      const result = this.databaseService.executeInsert(
        'INSERT INTO tests (testid, moduleid, name, module) VALUES (?, ?, ?, ?)',
        [testData.testid, testData.moduleid, testData.name, testData.module]
      );

      return this.findOneModule(testData.testid, testData.moduleid);
    } catch (error) {
      console.error('Error creating test:', error);
      throw new Error('Failed to create test');
    }
  }

  update(testid: number, moduleid: number, updateExamDto: UpdateExamDto) {
    try {
      const db = this.databaseService.getDb()
      const result = this.databaseService.executeUpdate(
        'UPDATE tests SET module = ?, name = ? WHERE testid = ? and moduleid =?',
        [updateExamDto.module, updateExamDto.name, updateExamDto.testid, updateExamDto.moduleid]
      );

      return this.findOneModule(updateExamDto.testid!, updateExamDto.moduleid!);
    } catch (error) {
      console.error('Error updating test:', error);
      throw new Error('Failed to update test');
    }
  }

  remove(testid: number, moduleid: number) {
    try {
      const db = this.databaseService.getDb()
      const result = this.databaseService.executeDelete(
      'DELETE from tests WHERE testid = ? and moduleid =?',
        [testid, moduleid]
      );

      // Todo: Is this correct return
      return "Exam module removed"
    } catch (error) {
      console.error('Error updating test:', error);
      throw new Error('Failed to update test');
    }
  }

}
