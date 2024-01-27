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
    try {
      const genra = await this.genraModal.insert({
        name: body.name,
      });
      console.log(genra);
      return 'success';
    } catch (error) {
      return error;
    }
  }

  async findAllGenra() {
    try {
      const genra = this.genraModal.find();
      return genra;
    } catch (error) {
      return error;
    }
  }

  async findGenraById(id: number) {
    try {
      const genra = await this.genraModal.findOne({ where: { id } });
      return genra;
    } catch (error) {
      console.log(error);
    }
  }

  async updateGenraById(id: number, body: genraDto) {
    try {
      const genra = await this.genraModal.update({ id }, { ...body });
      return 'success';
    } catch (error) {
      return error;
    }
  }

  async deleteGenraById(id: number) {
    try {
      const genra = await this.genraModal.delete({ id });
      return 'sucess';
    } catch (error) {
      return error;
    }
  }
}
