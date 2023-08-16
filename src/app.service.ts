import { Injectable } from "@nestjs/common";
import { ReportType, data } from "./data";
import { v4 as uuid } from "uuid"
import reportTypeCheck from "./utils/reportTypeCheck";
import { CreateReportDto, UpdateReportDto } from "./dtos/report.dto";

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
export class AppService {
  
  getAllReports(){
    return data.report
  }


  getAllReportsByType(type: ReportType){
    return data.report.filter((report) => report.type === type);
  }

  getReportsById(type: ReportType, id: string){
    return data.report
      .filter((report) => report.type === type)
      .find(report => report.id === id)
  }

  createReport(type: ReportType, {amount, source}: ReportData){
    const newReport = { 
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === "income" ? ReportType.Income : ReportType.Expense
    }
    data.report.push(newReport)
    return newReport
  }



  updateReport(id: string, type: ReportType, body: UpdateReportData ){
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
      //  if(!body.typeName) {
      //   data.report[reportIndex] = {
      //     ...data.report[reportIndex],
      //     ...body,
      //     updated_at: new Date(),
      //   } 
      //  } else {
      //   data.report[reportIndex] = {
      //     ...data.report[reportIndex],
      //     ...body,
      //     type: reportTypeCheck(body.typeName) ,
      //     updated_at: new Date(),
      //   }
      //  }
      
  }

  deleteReport(id: string){
    const reportIndex = data.report.findIndex(report => report.id === id)
    if(reportIndex === -1) return
    const deletedReport = data.report.splice(reportIndex, 1)    
    return 
  }
}