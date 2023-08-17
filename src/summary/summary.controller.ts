
import { Controller, Get, ParseEnumPipe, Param } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { ReportType } from 'src/data';
import reportTypeCheck from 'src/utils/reportTypeCheck';
import { SummaryResponseDto } from 'src/dtos/summary.dto';

@Controller('summary')
export class SummaryController {
    constructor(
        private readonly summaryService: SummaryService
      ){}

      @Get()
      getNetSummary(): SummaryResponseDto{
        return this.summaryService.getNetSummary()
      }

      @Get('/:type')
      getReportSummary(
        @Param('type', new ParseEnumPipe(ReportType)) type: string
      ): SummaryResponseDto {
        return this.summaryService.getReportSummary(reportTypeCheck(type))
      }
}
