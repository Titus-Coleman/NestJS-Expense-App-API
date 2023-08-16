import { ReportType } from "../data"


export default function reportTypeCheck(type: string): ReportType {
    return type === "income" ? ReportType.Income : ReportType.Expense
  }