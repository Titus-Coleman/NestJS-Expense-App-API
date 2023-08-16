import { Controller, Delete, Get, Post, Put, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe } from "@nestjs/common"
import { ReportType } from "./data"
import { AppService } from "./app.service"
import reportTypeCheck from "./utils/reportTypeCheck"
import { CreateReportDto, UpdateReportDto } from "./dtos/report.dto"

@Controller('report')
export class AppController {


  constructor(
    private readonly appService: AppService
  ){}

  @Get()
  getAllReports() {
    return this.appService.getAllReports()
  }

  @Get('/:type')
  getReportsbyType(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ) {
    return this.appService.getAllReportsByType(reportTypeCheck(type))
  }

  @Get('/:type/:id')
  getAllReportsById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.appService.getReportsById(reportTypeCheck(type),id)
  }

  @Post('/:type')
  createReport(
    @Body() {amount, source}: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ){
    return this.appService.createReport(reportTypeCheck(type), {amount, source})
  }

  @Put('/:type/:id')
  editReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ) {
    return this.appService.updateReport(id, reportTypeCheck(type),body)
     }

  @HttpCode(204)
  @Delete('/:id')
  deleteIncomeReport(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.appService.deleteReport(id)
  }

}