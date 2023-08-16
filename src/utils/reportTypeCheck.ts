import { ReportType } from "../data"


export default function reportTypeCheck(type: string): ReportType {
    if(!type) return
    return type === "income" ? ReportType.Income : ReportType.Expense
  }