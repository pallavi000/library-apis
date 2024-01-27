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
    try {
      const author = await this.authorModal.insert({
        name: body.name,
      });
      console.log(author);
      return 'success';
    } catch (error) {
      return error;
    }
  }

  async findAllAuthor() {
    try {
      const author = this.authorModal.find();
      return author;
    } catch (error) {
      return error;
    }
  }

  async findAuthorById(id: number) {
    try {
      const author = await this.authorModal.findOne({ where: { id } });
      return author;
    } catch (error) {
      console.log(error);
    }
  }

  async updateAuthorById(id: number, body: authorDto) {
    try {
      const author = await this.authorModal.update({ id }, { ...body });
      return 'success';
    } catch (error) {
      return error;
    }
  }

  async deleteAuthorById(id: number) {
    try {
      const author = await this.authorModal.delete({ id });
      return 'sucess';
    } catch (error) {
      return error;
    }
  }
}
