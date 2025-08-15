import { Injectable } from '@nestjs/common';
// import db from './database.ts';

@Injectable()
export class AppService {
  getHello(): string {
    // console.log("db ", db)
    return 'Hello World!';
  }
}
