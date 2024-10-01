import { Transform, Type } from 'class-transformer';
import { IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class FilterProductDto {
  @IsOptional()
  @Transform(({ value }) => value === 'true') // Convierte a booleano
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  name?: string;

  @IsOptional()
  created_by?: number;
}
