import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { SummaryResponseDto } from 'src/dtos/summary.dto';

@Injectable()
export class SummaryService {

    getReportSummary(type: ReportType): SummaryResponseDto{
       const totalSum = data.report
        .filter(report => report.type === type)
        .reduce((acc, obj) => {return acc + obj.amount;},0)
        
        const newSummaryReport = {
            type,
            amount: (type === "expense") ? -totalSum : totalSum
        }
        console.log(newSummaryReport)
       return newSummaryReport;
    }


    getNetSummary(): SummaryResponseDto{
        const totalIncome = data.report
        .filter(report => report.type === "income")
        .reduce((acc, obj) => {return acc + obj.amount;},0)
        
        const totalExpense = data.report
        .filter(report => report.type === "expense")
        .reduce((acc, obj) => {return acc + obj.amount;},0)
        
        const netSummaryReport = {
            type: "Net Total",
            amount: totalIncome + (-totalExpense)
        }
        return netSummaryReport
    }
}
