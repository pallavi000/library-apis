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

  createAuthor(body: authorDto) {
    const author = this.authorModal.insert({
      name: body.name,
    });
    console.log(author);
    return 'success';
  }

  findAllAuthor() {
    const author = this.authorModal.find({ relations: ['books'] });
    return author;
  }

  findAuthorById(id: number) {
    const author = this.authorModal.findOne({ where: { id } });
    return author;
  }

  updateAuthorById(id: number, body: authorDto) {
    const author = this.authorModal.update({ id }, { ...body });
    return 'success';
  }

  deleteAuthorById(id: number) {
    const author = this.authorModal.delete({ id });
    return 'success';
  }
}
