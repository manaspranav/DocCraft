import { Controller, Get, Query, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // 1. Top N forms by submission count
  @Get('forms/most-popular')
  getMostPopularForms(@Query('limit') limit?: string) {
    return this.analyticsService.getMostPopularForms(limit ? parseInt(limit) : 5);
  }

  // 2. Submissions per day/week for a form
  @Get('forms/:id/submissions-over-time')
  getSubmissionsOverTime(
    @Param('id') formId: string,
    @Query('interval') interval?: 'day' | 'week',
  ) {
    return this.analyticsService.getSubmissionsOverTime(formId, interval || 'day');
  }

  // 3. Stats for each field in a form
  @Get('forms/:id/field-stats')
  getFieldStats(@Param('id') formId: string) {
    return this.analyticsService.getFieldStats(formId);
  }

  // 4. Users with the most submissions
  @Get('users/most-active')
  getMostActiveUsers(@Query('limit') limit?: string) {
    return this.analyticsService.getMostActiveUsers(limit ? parseInt(limit) : 5);
  }
}
