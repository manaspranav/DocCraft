import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { subDays, startOfDay, startOfWeek, format } from 'date-fns';

@Injectable()
export class AnalyticsService {
  private prisma = new PrismaClient();

  // 1. Top N forms by submission count
  async getMostPopularForms(limit: number = 5) {
    return this.prisma.form.findMany({
      orderBy: {
        responses: {
          _count: 'desc',
        },
      },
      take: limit,
      include: {
        _count: {
          select: { responses: true },
        },
      },
    });
  }

  // 2. Submissions per day/week for a form
  async getSubmissionsOverTime(formId: string, interval: 'day' | 'week' = 'day') {
    const now = new Date();
    let startDate: Date;
    let groupByFormat: string;
    if (interval === 'day') {
      startDate = subDays(now, 14); // last 14 days
      groupByFormat = 'yyyy-MM-dd';
    } else {
      startDate = subDays(now, 56); // last 8 weeks
      groupByFormat = 'yyyy-ww';
    }
    const responses = await this.prisma.response.findMany({
      where: {
        formId,
        // createdAt: { gte: startDate }, // Uncomment if you add createdAt to Response
      },
      select: {
        // createdAt: true, // Uncomment if you add createdAt to Response
        id: true,
      },
    });
    // NOTE: Add createdAt to Response model for real grouping
    // For now, just return count
    return [{ label: interval, count: responses.length }];
  }

  // 3. Stats for each field in a form
  async getFieldStats(formId: string) {
    const questions = await this.prisma.question.findMany({
      where: { formId },
      include: {
        responseAnswers: true,
      },
    });
    return questions.map(q => ({
      questionId: q.id,
      title: q.title,
      type: q.type,
      totalAnswers: q.responseAnswers.length,
      // Add more stats as needed
    }));
  }

  // 4. Users with the most submissions
  async getMostActiveUsers(limit: number = 5) {
    return this.prisma.user.findMany({
      orderBy: {
        forms: {
          _count: 'desc',
        },
      },
      take: limit,
      include: {
        _count: {
          select: { forms: true },
        },
      },
    });
  }
}
