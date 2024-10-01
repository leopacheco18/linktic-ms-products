import { CategoryEntity } from './entities/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<CategoryEntity[]> {
    return this.categoriesRepository.find();
  }

  async findOne(id: FindOneOptions<CategoryEntity>): Promise<CategoryEntity> {
    return this.categoriesRepository.findOne(id);
  }
}
