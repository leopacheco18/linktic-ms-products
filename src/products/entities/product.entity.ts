import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity({ schema: 'linktic', name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty({ description: 'ID del producto' })
  product_id: number;

  @Column({ name: 'name' })
  @ApiProperty({ description: 'Nombre del producto' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Descripción del producto', required: false })
  description: string;

  @Column({ name: 'url_image' })
  @ApiProperty({ description: 'URL de la imagen del producto' })
  url_image: string;

  @Column({ type: 'numeric' })
  @ApiProperty({ description: 'Precio del producto' })
  price: number;

  @Column({ type: 'bigint' })
  @ApiProperty({ description: 'Cantidad disponible del producto' })
  quantity: number;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ description: 'Fecha de creación del producto' })
  created_at: Date;

  @Column({ default: true })
  @ApiProperty({ description: 'Estado del producto' })
  status: boolean;

  @Column({ name: 'created_by', type: 'bigint' })
  @ApiProperty({ description: 'ID del usuario que creó el producto' })
  created_by: number;

  @OneToOne(() => CategoryEntity, (category) => category.product, {
    eager: true,
  })
  @ApiProperty({ description: 'Categoría del producto' })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
