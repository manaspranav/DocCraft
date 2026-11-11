import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
  IsInt,
  IsISO8601
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType, Visibility } from '@prisma/client';

export class CreateQuestionDto {
  @IsString()
  title: string;

  @IsEnum(QuestionType, { message: 'Invalid question type' })
  type: QuestionType;

  @IsOptional()
  answer?: any;

  @IsOptional()
  options?: any;
}

export class CreateFormDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(Visibility, { message: 'Visibility must be either PUBLIC or PRIVATE' })
  visibility?: Visibility;

  @IsOptional()
  @IsInt()
  responseLimit?: number;

  @IsOptional()
  @IsISO8601() // No 'message' here
  deadline?: string;

  @IsOptional()
  @IsString()
  creatorId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
