import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Database from 'better-sqlite3';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private db: Database.Database;

  onModuleInit() {
    try {
      this.db = new Database('./src/sqlite/satdb_v2.db');
      
      // Configure database settings for better performance
      this.db.pragma('journal_mode = WAL');
      this.db.pragma('foreign_keys = ON');
      this.db.pragma('synchronous = NORMAL');
      
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }

  onModuleDestroy() {
    if (this.db) {
      this.db.close();
      console.log('Database connection closed');
    }
  }

  // Generic query methods
  findAll(tableName: string): any[] {
    try {
      const stmt = this.db.prepare(`SELECT * FROM ${tableName}`);
      return stmt.all();
    } catch (error) {
      console.error(`Error querying table ${tableName}:`, error);
      throw error;
    }
  }

  findById(tableName: string, id: number): any {
    try {
      const stmt = this.db.prepare(`SELECT * FROM ${tableName} WHERE id = ?`);
      return stmt.get(id);
    } catch (error) {
      console.error(`Error finding record in ${tableName} with id ${id}:`, error);
      throw error;
    }
  }

  getDb(): any {
    try {
      return this.db
    } catch (error) {
      console.error(`Error finding db`);
      throw error;
    }
  }

  executeQuery(query: string, params: any[] = []): any[] {
    try {
      const stmt = this.db.prepare(query);
      return stmt.all(...params);
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  executeInsert(query: string, params: any[] = []): Database.RunResult {
    try {
      const stmt = this.db.prepare(query);
      return stmt.run(...params);
    } catch (error) {
      console.error('Error executing insert:', error);
      throw error;
    }
  }

  executeUpdate(query: string, params: any[] = []): Database.RunResult {
    try {
      const stmt = this.db.prepare(query);
      return stmt.run(...params);
    } catch (error) {
      console.error('Error executing update:', error);
      throw error;
    }
  }

  executeDelete(query: string, params: any[] = []): Database.RunResult {
    try {
      const stmt = this.db.prepare(query);
      return stmt.run(...params);
    } catch (error) {
      console.error('Error executing delete:', error);
      throw error;
    }
  }

  // Transaction support
  transaction<T>(callback: () => T): T {
    return this.db.transaction(callback)();
  }
}
