import { IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class FilterProductDto {
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  created_by?: number; 
}
