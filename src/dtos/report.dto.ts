import { IsNumber, IsPositive, IsString, IsNotEmpty, IsOptional } from "class-validator"; 
import { IsValidReportType } from "src/utils/reportTypeValidator";

export class CreateReportDto {
   
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    @IsNotEmpty()
    source: string;

}


export class UpdateReportDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsOptional()
    @IsString()
    source: string;

    @IsOptional()
    @IsString()
    @IsValidReportType(['income', 'expense'])
    type: string
}
