import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAll(filterDto: FilterProductDto): Promise<Product[]> {
    const query = this.productsRepository.createQueryBuilder('product');

    if (filterDto.status !== undefined) {
      query.andWhere('product.status = :status', { status: filterDto.status });
    }

    if (filterDto.minPrice) {
      query.andWhere('product.price >= :minPrice', { minPrice: filterDto.minPrice });
    }

    if (filterDto.maxPrice) {
      query.andWhere('product.price <= :maxPrice', { maxPrice: filterDto.maxPrice });
    }

    if (filterDto.created_by) {
      query.andWhere('product.created_by = :created_by', { created_by: filterDto.created_by });
    }

    console.log(query.getSql());

    return query.getMany();
  }

  async findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne({ where: { product_id: id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productsRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
