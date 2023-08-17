import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsPositive, IsString, IsNotEmpty, IsOptional } from "class-validator"; 
import { ReportType } from "src/data";
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

export class ReportResponseDto {
    id: string;
    source: string;
    amount: number;
    type: ReportType;

    @Expose({name: "createdAt"})
    transformCreatedAt(){
        return this.created_at;
    }
    @Exclude()
    created_at: Date;
    

    @Exclude()
    updated_at: Date;

    

    constructor(partial: Partial<ReportResponseDto>){
        Object.assign(this, partial);
    }
}