import { Injectable } from "@nestjs/common";
import { AuthorEntity } from "./entity/authot.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { authorDto } from "./dto/author.dto";

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorModal: Repository<AuthorEntity>
  ) {}

  async createAuthor(body: authorDto) {
    return await this.authorModal.insert({
      ...body,
    });
  }

  async findAllAuthor() {
    const author = await this.authorModal.find({ relations: ["books"] });
    return author;
  }

  async findAuthorById(id: number) {
    const author = await this.authorModal.findOne({ where: { id } });
    return author;
  }

  async updateAuthorById(id: number, body: authorDto) {
    return await this.authorModal.update({ id }, { ...body });
  }

  async deleteAuthorById(id: number) {
    return await this.authorModal.delete({ id });
  }
}
