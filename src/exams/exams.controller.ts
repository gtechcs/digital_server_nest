import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get()
  findAll() {
    return this.examsService.findAll();
  }

  @Get(':id')
  findAllModules(@Param('id') id: string) {
    return this.examsService.findAllModules(+id);
  }

  @Get(':id/module/:moduleid')
  findOneModule(@Param('id') id: string, @Param('moduleid') moduleid: string) {
    return this.examsService.findOneModule(+id, +moduleid);
  }

  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examsService.create(createExamDto);
  }

  @Patch(':id/module/:moduleid')
  update(
    @Param('id') id: string,
    @Param('moduleid') moduleid: string,
    @Body() updateExamDto: UpdateExamDto,
  ) {
    return this.examsService.update(+id, +moduleid, updateExamDto);
  }

  @Delete(':id/module/:moduleid')
  remove(@Param('id') id: string, @Param('moduleid') moduleid: string) {
    return this.examsService.remove(+id, +moduleid);
  }

  @Get(':id/module/:moduleid/questions')
  findModuleQuestions(@Param('id') id: string, @Param('moduleid') moduleid: string) {
    return this.examsService.findModuleQuestions(+id, +moduleid);
  }

}
