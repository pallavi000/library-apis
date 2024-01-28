import { Injectable } from '@nestjs/common';
import { AuthorEntity } from './entity/authot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { authorDto } from './dto/author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorModal: Repository<AuthorEntity>,
  ) {}

  async createAuthor(body: authorDto) {
    const author = await this.authorModal.insert({
      name: body.name,
    });
    console.log(author);
    return 'success';
  }

  async findAllAuthor() {
    const author = this.authorModal.find({ relations: ['books'] });
    return author;
  }

  async findAuthorById(id: number) {
    const author = await this.authorModal.findOne({ where: { id } });
    return author;
  }

  async updateAuthorById(id: number, body: authorDto) {
    const author = await this.authorModal.update({ id }, { ...body });
    return 'success';
  }

  async deleteAuthorById(id: number) {
    const author = await this.authorModal.delete({ id });
    return 'sucess';
  }
}
