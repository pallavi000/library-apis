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
import { AuthorService } from './author.service';
import { authorDto } from './dto/author.dto';
import { AdminAuthGuard } from 'src/guards/auth-jwt/admin-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiError } from 'src/exceptions/api-error.exception';

@ApiTags('Author')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    type: authorDto,
    isArray: true,
  })
  async fetchAllAuthors() {
    try {
      const authors = await this.authorService.findAllAuthor();
      return authors;
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
  async addAuthor(@Body() body: authorDto): Promise<any> {
    try {
      await this.authorService.createAuthor(body);
      return {};
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Put('/:id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(201)
  @ApiResponse({
    status: 201,
  })
  @ApiBearerAuth()
  async updateAuthorById(@Param() param: any, @Body() body: authorDto) {
    const { id } = param;
    try {
      const author = await this.authorService.updateAuthorById(id, body);
      return author;
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
  async deleteAuthorById(@Param() param) {
    const { id } = param;
    try {
      const author = await this.authorService.deleteAuthorById(id);
      return author;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get('/:id')
  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    type: authorDto,
  })
  async fetchAuthorById(@Param() param: any) {
    const { id } = param;
    try {
      const author = await this.authorService.findAuthorById(id);
      return author;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
