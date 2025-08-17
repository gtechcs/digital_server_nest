import { IsString, IsNumber } from 'class-validator';

export class CreateExamDto {
  @IsNumber()
  testid: number;

  @IsNumber()
  moduleid: number;

  @IsString()
  name: string;

  @IsString()
  module: string;
}
