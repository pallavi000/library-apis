import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Request } from 'express';
import { productDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  getProduct() {
    const product = this.productService.findProduct();
    return product;
  }

  @Post('/')
  async createProduct(@Body() body: productDto, @Req() req: Request) {
    try {
      const product = this.productService.createProduct(body);
      return product;
    } catch (error) {
      return error;
    }
  }

  @Delete('/:id')
  async deleteProduct(@Param() param: any) {
    try {
      const product = this.productService.deleteProduct(param);
      return product;
    } catch (error) {
      console.log(error);
    }
  }
}
