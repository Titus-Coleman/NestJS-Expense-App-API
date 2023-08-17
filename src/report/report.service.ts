import { Injectable } from "@nestjs/common";
import { ReportType, data } from "../data";
import { v4 as uuid } from "uuid"
import reportTypeCheck from "../utils/reportTypeCheck";
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from "../dtos/report.dto";

interface ReportData {
  amount: number, 
  source: string
}

interface UpdateReportData {
  amount?: number, 
  source?: string
  typeName?: string
}

@Injectable()
export class ReportService {
  
  getAllReports(): ReportResponseDto[] {
    return data.report.map(report => new ReportResponseDto(report))
   
  }


  getAllReportsByType(type: ReportType): ReportResponseDto[] {
    return data.report.filter((report) => report.type === type).map(report => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find(report => report.id === id)

     if (!report) return
     
     return new ReportResponseDto(report)
  }

  createReport(type: ReportType, {amount, source}: ReportData): ReportResponseDto {
    const newReport = { 
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === "income" ? ReportType.Income : ReportType.Expense
    }
    data.report.push(newReport)
    return new ReportResponseDto(newReport)
  }



  updateReport(id: string, type: ReportType, body: UpdateReportData): ReportResponseDto {
    const reportToUpdate = data.report
      // .filter((report) => report.type === type)
      .find((report )=> report.id === id)

      if(!reportToUpdate) return;

      const reportIndex = data.report
        .findIndex((report) => report.id === reportToUpdate.id)


        data.report[reportIndex] = {
          ...data.report[reportIndex],
          ...body,
          updated_at: new Date(),
        } 
     
       return new ReportResponseDto(data.report[reportIndex]) 
      
  }

  deleteReport(id: string){
    const reportIndex = data.report.findIndex(report => report.id === id)
    if(reportIndex === -1) return
    const deletedReport = data.report.splice(reportIndex, 1)    
    return 
  }
}