import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { S3Service } from 'src/common/s3/s3.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoryEntity } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, CategoryEntity])],
  controllers: [ProductsController],
  providers: [ProductsService, S3Service, CategoriesService],
})
export class ProductsModule {}
