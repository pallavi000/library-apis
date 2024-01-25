import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { productDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly ProductModel: Repository<ProductEntity>,
  ) {}

  findProduct() {
    const product = this.ProductModel.find();
    return product;
  }

  createProduct(body: productDto) {
    const product = this.ProductModel.insert({
      name: body.name,
      detail: body.detail,
      price: body.price,
      categoryId: body.categoryId,
    });
    return 'success';
  }

  async deleteProduct(param: any) {
    const product = this.ProductModel.delete({ id: param });

    return 'success';
  }
}
