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
import { AuthorService } from './author.service';
import { authorDto } from './dto/author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get('/')
  async fetchAllAuthors() {
    try {
      const authors = await this.authorService.findAllAuthor();
      return authors;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('/')
  async addAuthor(@Body() body: authorDto): Promise<any> {
    console.log('hello');
    try {
      const author = await this.authorService.createAuthor(body);
      return author;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  @Get('/:id')
  async fetchAuthorById(@Param() param: any) {
    const { id } = param;
    try {
      const author = await this.authorService.findAuthorById(id);
      return author;
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  @Put('/:id')
  async updateAuthorById(@Param() param: any, @Body() body: authorDto) {
    const { id } = param;
    try {
      const author = await this.authorService.updateAuthorById(id, body);
      return author;
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  @Delete('/:id')
  async deleteAuthorById(@Param() param) {
    const { id } = param;
    try {
      const author = await this.authorService.deleteAuthorById(id);
      return author;
    } catch (error) {
      throw new BadGatewayException();
    }
  }
}
