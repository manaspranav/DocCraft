import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/form.dto';
import { QuestionType } from '@prisma/client';
import { ResponsesService } from '../responses/responses.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import type { File as MulterFile } from 'multer';

@Controller('forms')
export class FormsController {
  constructor(
    private readonly formsService: FormsService,
    private readonly responsesService: ResponsesService,
  ) {}

  @Post()
  async createForm(@Body() createFormDto: CreateFormDto): Promise<any> {
    const transformedDto = {
      ...createFormDto,
      questions: createFormDto.questions.map((q) => ({
        ...q,
        type: q.type.toLowerCase() as QuestionType,
      })),
    };

    return this.formsService.createForm(transformedDto);
  }
  @Post(':formId/submit')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + '-' + file.originalname);
        },
      }),
    }),
  )
  async submitForm(
    @Param('formId') formId: string,
    @UploadedFiles() files: MulterFile[],
    @Req() req: Request,
  ): Promise<any> {
    console.log('Incoming req.body:', req.body);
    if (!req || !req.body || typeof req.body.answers === 'undefined') {
      console.error('req.body or req.body.answers is undefined:', req?.body);
      return { error: 'No answers provided' };
    }
    let answers: any[] = [];
  
    try {
      if (typeof req.body.answers === 'string') {
        answers = JSON.parse(req.body.answers);
      } else if (Array.isArray(req.body.answers)) {
        answers = req.body.answers;
      } else {
        console.warn('req.body.answers is not a string/array:', req.body);
        answers = [];
      }
    } catch (e) {
      console.error('Failed to parse answers:', e);
      answers = [];
    }
  
    // Replace file placeholders
    if (files && files.length > 0) {
      answers = answers.map((ans: any) => {
        if (typeof ans.answer === 'string' && ans.answer.startsWith('__file__')) {
          const qid = ans.answer.replace('__file__', '');
          const file = files.find((f) => f.fieldname === `file_${qid}`);
          if (file) {
            return { ...ans, answer: `/uploads/${file.filename}` };
          }
        }
        return ans;
      });
    }
  
    return this.responsesService.createResponse({ formId, answers });
  }
  

  @Get(':id')
  async getFormById(@Param('id') id: string): Promise<any> {
    return this.formsService.getFormById(id);
  }

  @Get('user/:userId')
  async getUserForms(@Param('userId') userId: string): Promise<any> {
    return this.formsService.getFormByUser(userId);
  }

  @Get(':formId/responses')
  async getFormResponses(@Param('formId') formId: string): Promise<any[]> {
    return this.responsesService.getResponsesByFormId(formId);
  }

  @Put(':formId')
  async updateForm(
    @Param('formId') formId: string,
    @Body() updateFormDto: CreateFormDto,
  ): Promise<any> {
    const transformedDto = {
      ...updateFormDto,
      questions: updateFormDto.questions.map((q) => ({
        ...q,
        type: q.type.toLowerCase() as QuestionType,
      })),
    };
    return this.formsService.updateForm(formId, transformedDto);
  }
}
