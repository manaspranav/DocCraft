import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, QuestionType, Visibility } from '@prisma/client';
import { CreateFormDto } from './dto/form.dto';

@Injectable()
export class FormsService {
  constructor(private readonly prisma: PrismaService) {}
  async createForm(data: CreateFormDto): Promise<any> {
    const { title, creatorId, questions, description, visibility, responseLimit, deadline } = data;
  
    const createData: Prisma.FormCreateInput = {
      title,
      description: description ?? undefined,
      visibility:
        visibility?.toUpperCase() === 'PRIVATE' ? Visibility.PRIVATE : Visibility.PUBLIC,
      responseLimit: responseLimit ?? 100,
      deadline: deadline ? new Date(deadline) : undefined,
      questions: {
        create: questions.map((q) => ({
          title: q.title,
          type: q.type,
          answer: q.answer ?? null,
          options: q.options ?? undefined,
        })),
      },
    };
  
    if (creatorId) {
      createData.creator = { connect: { id: creatorId } };
    }
  
    return this.prisma.form.create({
      data: createData,
      include: { questions: true },
    });
  }
  

  async getFormByUser(userId: string): Promise<any> {
    return this.prisma.form.findMany({
      where: { creatorId: userId },
      include: { questions: true, responses: true },
    });
  }

  async getFormById(id: string): Promise<any> {
    return this.prisma.form.findUnique({
      where: { id },
      include: { questions: true },
    });
  }

  async updateForm(formId: string, data: CreateFormDto): Promise<any> {
    const { title, description, visibility, responseLimit, deadline } = data;

    const updatedForm = await this.prisma.form.update({
      where: { id: formId },
      data: {
        title,
        description: description ?? undefined,
        visibility: visibility ?? Visibility.PUBLIC,
        responseLimit: responseLimit ?? 100,
        deadline: deadline ? new Date(deadline) : undefined,
      },
    });

    // Replace old questions with new ones
    await this.prisma.question.deleteMany({ where: { formId } });

    await this.prisma.question.createMany({
      data: data.questions.map((q) => ({
        formId,
        title: q.title,
        type: q.type,
        answer: q.answer ?? null,
        options: q.options ?? undefined,
      })),
    });

    return this.getFormById(formId);
  }
}
