import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResponsesService } from './responses.service';

@Controller('responses')
export class ResponsesController {
    constructor(private readonly responsesService: ResponsesService) {}

    @Post()
    async createResponse(@Body() createResponseDto: { formId: string; answers: { questionId: string; answer: string }[] }): Promise<any> {
        return this.responsesService.createResponse(createResponseDto);
    }

    @Get('form/:formId')
    async getResponsesByFormId(@Param('formId') formId: string): Promise<any[]> {
        return this.responsesService.getResponsesByFormId(formId);
    }
}