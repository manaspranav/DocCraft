import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResponsesService {
    constructor(private readonly prisma: PrismaService) {}

    async createResponse(data: { formId: string; answers: { questionId: string; answer: string }[] }): Promise<any> {
        return this.prisma.response.create({
            data: {
                formId: data.formId,
                answers: {
                    create: data.answers.map(ans => ({
                        questionId: ans.questionId,
                        answer: ans.answer,
                    })),
                },
            },
            include: { answers: true },
        });
    }

    async getResponsesByFormId(formId: string): Promise<any[]> {
        return this.prisma.response.findMany({
            where: { formId },
            include: {
                answers: {
                    include: {
                        question: true,
                    },
                },
            },
        });
    }
}
