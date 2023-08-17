import { Controller, Delete, Get, Post, Put, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe, ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common"
import { ReportType } from "../data"
import { ReportService } from "./report.service"
import reportTypeCheck from "../utils/reportTypeCheck"
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from "../dtos/report.dto"

@UseInterceptors(ClassSerializerInterceptor)
@Controller('report')
export class ReportController {


  constructor(
    private readonly reportService: ReportService
  ){}

  @Get()
  getAllReports(): ReportResponseDto[] {
    return this.reportService.getAllReports()
  }

  @Get('/:type')
  getReportsbyType(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    return this.reportService.getAllReportsByType(reportTypeCheck(type))
  }

  @Get('/:type/:id')
  getAllReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string
  ): ReportResponseDto {
    return this.reportService.getReportById(reportTypeCheck(type),id)
  }

  @Post('/:type')
  createReport(
    @Body() {amount, source}: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto {
    return this.reportService.createReport(reportTypeCheck(type), {amount, source})
  }

  @Put('/:type/:id')
  editReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto {
    return this.reportService.updateReport(id, reportTypeCheck(type),body)
     }

  @HttpCode(204)
  @Delete('/:id')
  deleteIncomeReport(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.reportService.deleteReport(id)
  }

}