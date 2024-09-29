import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/common/s3/s3.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,
    private readonly s3Service: S3Service) {}

  @Post()
  
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto con una imagen' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        quantity: { type: 'number' },
        status: { type: 'boolean' },
        created_by: { type: 'number' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    const imageUrl = await this.s3Service.uploadFile(file);

    const product = await this.productsService.create({
      ...createProductDto,
      url_image: imageUrl, 
    });

    return product;
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos', type: [Product] })
  getAll(@Query() filterDto: FilterProductDto): Promise<Product[]> {
    return this.productsService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: Product })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto actualizado', type: Product })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiResponse({ status: 204, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
