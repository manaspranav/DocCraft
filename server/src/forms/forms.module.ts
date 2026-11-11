import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { PrismaService } from '../prisma/prisma.service';
import { ResponsesService } from '../responses/responses.service';


@Module({
  controllers: [FormsController],
  providers: [FormsService, PrismaService, ResponsesService],
})
export class FormsModule {}