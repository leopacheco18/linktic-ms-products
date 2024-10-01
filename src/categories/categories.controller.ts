import { CategoriesService } from './categories.service';
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryEntity } from './entities/category.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorias' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias',
    type: [CategoryEntity],
  })
  getAll(): Promise<CategoryEntity[]> {
    return this.categoriesService.findAll();
  }
}
