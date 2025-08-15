import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
// import db from '../sqlite/database.js';

import Database from 'better-sqlite3';
const db = new Database('./src/sqlite/satdb_v2.db');

@Injectable()
export class QuestionsService {
  create(createQuestionDto: CreateQuestionDto) {
    return 'This action adds a new question';
  }

  // findAll(): {
  //   try {
  //     const stmt = db.prepare("SELECT * FROM questions");
  //     const rows = stmt.all();
  //     return rows;
  //   } catch (error) {
  //     console.error('Error querying database:', error);
  //     throw new Error("Questions failed");
  //   }
  // }

  async findAll(): Promise<any[]> {
    try {
      const stmt = db.prepare("SELECT * FROM questions");
      const rows = stmt.all();
      return rows;
    } catch (error) {
      console.error('Error querying database:', error);
      throw new Error("Questions failed");
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
