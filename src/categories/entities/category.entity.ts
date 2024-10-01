import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity({ schema: 'linktic', name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty({ description: 'ID de la categoria' })
  category_id: number;

  @Column({ name: 'name' })
  @ApiProperty({ description: 'Nombre de la categoria' })
  name: string;

  @Column({ name: 'code' })
  @ApiProperty({ description: 'Codigo de la categoria' })
  code: string;

  @OneToOne(() => Product, (product) => product.category, { lazy: true })
  @ApiProperty({ description: 'Producto de la categoría' })
  @JoinColumn({ name: 'category_id' })
  product: Promise<Product>;
}
