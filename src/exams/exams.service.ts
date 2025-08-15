import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { DatabaseService } from '../sqlite/database.service';

// import Database from 'better-sqlite3';
// const db = new Database('./src/sqlite/satdb_v2.db');

export interface Exam {
  testid: number;
  moduleid: number;
  name: string;
  module: string;
}

@Injectable()
export class ExamsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createExamDto: CreateExamDto) {
    return 'This action adds a new exam';
  }

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

  create(testData: Omit<Exam, 'id' | 'created_at'>): Exam {
    try {
      const result = this.databaseService.executeInsert(
        'INSERT INTO tests (testid, moduleid, name, module) VALUES (?, ?)',
        [testData.testid, testData.moduleid, testData.name, testData.module]
      );
      
      return this.findOne(result.lastInsertRowid as number);
    } catch (error) {
      console.error('Error creating test:', error);
      throw new Error('Failed to create test');
    }
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} exam`;
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
}
