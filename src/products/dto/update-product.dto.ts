import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ description: 'Nombre del producto', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Descripción del producto', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'URL de la imagen del producto', required: false })
  @IsOptional()
  @IsString()
  url_image?: string;

  @ApiProperty({ description: 'Precio del producto', required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ description: 'Cantidad disponible del producto', required: false })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty({ description: 'Estado del producto', required: false })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiProperty({ description: 'ID del usuario que creó el producto', required: false })
  @IsOptional()
  @IsNumber()
  created_by?: number;
}
