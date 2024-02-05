import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

//entity
import { GenraEntity } from './entity/genra.entity';

//dto
import { genraDto } from './dto/genra.dto';

@Injectable()
export class GenraService {
  constructor(
    @InjectRepository(GenraEntity)
    private readonly genraModal: Repository<GenraEntity>,
  ) {}

  async createGenra(body: genraDto) {
    const genra = await this.genraModal.insert({
      name: body.name,
    });
    return {};
  }

  async findAllGenra() {
    const genra = await this.genraModal.find();
    return genra;
  }

  async findGenraById(id: number) {
    const genra = await this.genraModal.findOne({ where: { id } });
    return genra;
  }

  async updateGenraById(id: number, body: genraDto) {
    return await this.genraModal.update({ id }, { ...body });
  }

  async deleteGenraById(id: number) {
    return await this.genraModal.delete({ id });
  }
}
