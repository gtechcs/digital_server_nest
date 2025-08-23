import { IsString, IsNumber } from 'class-validator';

export class CreateQuestionDto {
  @IsNumber()
  questionid: number;

  @IsString()
  domain: string;

  @IsString()
  subject: string;

  @IsString()
  question: string;

  @IsString()
  A: string;

  @IsString()
  B: string;

  @IsString()
  C: string;

  @IsString()
  D: string;

  @IsString()
  paragraph: string;

  @IsString()
  explanation: string;

  @IsString()
  answer: string;

  @IsString()
  difficulty: string;
}
