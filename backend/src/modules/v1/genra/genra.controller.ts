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
  UseGuards,
} from '@nestjs/common';
import { GenraService } from './genra.service';
import { genraDto } from './dto/genra.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/guards/auth-jwt/admin-auth.guard';
import { ApiError } from 'src/exceptions/api-error.exception';

@ApiTags('Genre')
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
      throw new ApiError(error);
    }
  }

  @Post('/')
  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBearerAuth()
  async addGenra(@Body() body: genraDto): Promise<any> {
    console.log('hello');
    try {
      const genra = await this.genraService.createGenra(body);
      return genra;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Put('/:id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBearerAuth()
  async updateGenraById(@Param() param: any, @Body() body: genraDto) {
    const { id } = param;
    try {
      const genra = await this.genraService.updateGenraById(id, body);
      return genra;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(204)
  @ApiResponse({
    status: 204,
  })
  @ApiBearerAuth()
  async deleteGenraById(@Param() param) {
    const { id } = param;
    try {
      const genra = await this.genraService.deleteGenraById(id);
      return genra;
    } catch (error) {
      throw new ApiError(error);
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
      throw new ApiError(error);
    }
  }
}
