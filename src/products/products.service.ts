import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @Inject(forwardRef(() => CategoriesService))
    private categoryService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create({
      ...createProductDto,
      status: createProductDto.status === 'true',
      category: { category_id: createProductDto.category_id },
    });
    return this.productsRepository.save(product);
  }

  async findAll(filterDto: FilterProductDto): Promise<Product[]> {
    const query = this.productsRepository.createQueryBuilder('product');

    query.leftJoinAndSelect('product.category', 'category');
    if (filterDto.status !== undefined) {
      query.andWhere('product.status = :status', { status: filterDto.status });
    }

    if (filterDto.minPrice) {
      query.andWhere('product.price >= :minPrice', {
        minPrice: filterDto.minPrice,
      });
    }

    if (filterDto.maxPrice) {
      query.andWhere('product.price <= :maxPrice', {
        maxPrice: filterDto.maxPrice,
      });
    }

    if (filterDto.created_by) {
      query.andWhere('product.created_by = :created_by', {
        created_by: filterDto.created_by,
      });
    }

    if (filterDto.categoryId) {
      query.andWhere('category.category_id = :categoryId', {
        categoryId: filterDto.categoryId,
      });
    }

    if (filterDto.name) {
      query.andWhere('product.name ILIKE :name', {
        name: `${filterDto.name}%`,
      });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne({ where: { product_id: id } });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { product_id: id },
      relations: ['category'], // Incluye la relación 'category' si es necesario
    });

    if (!product) {
      throw new Error('Product not found');
    }

    // 2. Si `updateProductDto.category_id` está presente, busca la categoría correspondiente
    if (updateProductDto.category_id) {
      const category = await this.categoryService.findOne({
        where: { category_id: updateProductDto.category_id },
      });

      if (!category) {
        throw new Error('Category not found');
      }

      // Asigna la categoría al producto
      product.category = category;
    }

    console.log(updateProductDto)
    // 3. Asigna los demás valores del DTO al producto
    product.name = updateProductDto.name;
    product.price = updateProductDto.price;
    product.description = updateProductDto.description;
    product.quantity = updateProductDto.quantity;
    product.created_by = updateProductDto.created_by;
    product.status = updateProductDto.status === 'true';
    product.url_image = updateProductDto.url_image;

    // 4. Guarda la entidad completa con las relaciones
    return await this.productsRepository.save(product);
  }

  async remove(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { product_id: id },
      relations: ['category'],
    });
    product.status = false;
    await this.productsRepository.update(id, product);
    return product;
  }
}
