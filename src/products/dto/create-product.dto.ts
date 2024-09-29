import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descripción del producto', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNotEmpty()
  @Type(() => Number)  // Transforma el campo a número
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Cantidad disponible del producto' })
  @IsNotEmpty()
  @Type(() => Number)  // Transforma el campo a número
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Estado del producto' })
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')  // Convierte a booleano
  @IsBoolean()
  status: boolean;

  @ApiProperty({ description: 'ID del usuario que creó el producto' })
  @IsNotEmpty()
  @Type(() => Number)  // Transforma el campo a número
  @IsNumber()
  created_by: number;

  @ApiProperty({ description: 'URL de la imagen del producto', required: false })
  @IsOptional()
  @IsString()
  url_image?: string;
  
}
