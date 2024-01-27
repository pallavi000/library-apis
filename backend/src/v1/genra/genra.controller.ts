import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GenraService } from './genra.service';
import { genraDto } from './dto/genra.dto';

@Controller('genra')
export class GenraController {
  constructor(private readonly genraService: GenraService) {}

  @Get('/')
  async fetchAllGenra() {
    try {
      const genra = await this.genraService.findAllGenra();
      return genra;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('/')
  async addBook(@Body() body: genraDto): Promise<any> {
    console.log('hello');
    try {
      const book = await this.genraService.createGenra(body);
      return book;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  @Get('/:id')
  async fetchBookById(@Param() param: any) {
    const { id } = param;
    try {
      const book = await this.genraService.findGenraById(id);
      return book;
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  @Put('/:id')
  async updateBookById(@Param() param: any, @Body() body: genraDto) {
    const { id } = param;
    try {
      const book = await this.genraService.updateGenraById(id, body);
      return book;
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  @Delete('/:id')
  async deleteBookById(@Param() param) {
    const { id } = param;
    try {
      const book = await this.genraService.deleteGenraById(id);
      return book;
    } catch (error) {
      throw new BadGatewayException();
    }
  }
}
