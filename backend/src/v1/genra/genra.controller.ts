import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GenraService } from './genra.service';
import { genraDto } from './dto/genra.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('genra')
export class GenraController {
  constructor(private readonly genraService: GenraService) {}

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    type: genraDto,
    isArray: true,
  })
  async fetchAllGenra() {
    try {
      const genra = await this.genraService.findAllGenra();
      return genra;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  async addGenra(@Body() body: genraDto): Promise<any> {
    console.log('hello');
    try {
      const genra = await this.genraService.createGenra(body);
      return genra;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  @Get('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: genraDto,
  })
  async fetchGenraById(@Param() param: any) {
    const { id } = param;
    try {
      const genra = await this.genraService.findGenraById(id);
      return genra;
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  @Put('/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  async updateGenraById(@Param() param: any, @Body() body: genraDto) {
    const { id } = param;
    try {
      const genra = await this.genraService.updateGenraById(id, body);
      return genra;
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
  })
  async deleteGenraById(@Param() param) {
    const { id } = param;
    try {
      const genra = await this.genraService.deleteGenraById(id);
      return genra;
    } catch (error) {
      throw new BadGatewayException();
    }
  }
}
