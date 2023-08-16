import { IsNumber, IsPositive, IsString, IsNotEmpty, IsOptional } from "class-validator"; 

export class CreateReportDto {
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    @IsNotEmpty()
    source: string;

    @IsOptional()
    @IsString()
    typeName?: string
}