import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { Transform, Type } from 'class-transformer';

export class UpdateProductDto {
  @ApiProperty({ description: 'Nombre del producto', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Descripción del producto', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    required: false,
  })
  @IsOptional()
  @IsString()
  url_image?: string;

  @ApiProperty({ description: 'Precio del producto', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;

  @ApiProperty({
    description: 'Cantidad disponible del producto',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  quantity?: number;

  @ApiProperty({ description: 'Estado del producto', required: false })
  @IsOptional()
  @IsString() // Convierte a booleano
  status?: string;

  @ApiProperty({
    description: 'ID del usuario que creó el producto',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  created_by?: number;

  @ApiProperty({
    description: 'ID de la categoria del producto',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  category_id?: number;

  @IsOptional()
  category?: CategoryEntity;
}
