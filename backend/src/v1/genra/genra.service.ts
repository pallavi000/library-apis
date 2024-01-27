import { Injectable } from '@nestjs/common';
import { GenraEntity } from './entity/genra.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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
    console.log(genra);
    return 'success';
  }

  async findAllGenra() {
    const genra = this.genraModal.find();
    return genra;
  }

  async findGenraById(id: number) {
    const genra = await this.genraModal.findOne({ where: { id } });
    return genra;
  }

  async updateGenraById(id: number, body: genraDto) {
    const genra = await this.genraModal.update({ id }, { ...body });
    return 'success';
  }

  async deleteGenraById(id: number) {
    const genra = await this.genraModal.delete({ id });
    return 'sucess';
  }
}
