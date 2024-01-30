import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { userDto } from "./dto/user.dto";
import { AdminAuthGuard } from "src/guards/auth-jwt/admin-auth.guard";
import { ApiError } from "src/exceptions/api-error.exception";

@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/")
  @ApiResponse({
    status: HttpStatus.OK,
    type: userDto,
    isArray: true,
  })
  async fetchAlluser() {
    try {
      const user = await this.userService.findAllUsers();
      return user;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get("/non-members")
  @ApiResponse({
    status: HttpStatus.OK,
    type: userDto,
    isArray: true,
  })
  async fetchUsersWithoutMembership() {
    try {
      const user = await this.userService.fetchUsersWithoutMembership();
      return user;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Post("/")
  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBearerAuth()
  async addUser(@Body() body: userDto): Promise<any> {
    console.log("hello");
    try {
      const user = await this.userService.createUser(body);
      return user;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Put("/:id")
  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBearerAuth()
  async updateuserById(@Param() param: any, @Body() body: userDto) {
    const { id } = param;
    try {
      const user = await this.userService.updateUser(id, body);
      return user;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Delete("/:id")
  @UseGuards(AdminAuthGuard)
  @HttpCode(204)
  @ApiResponse({
    status: 204,
  })
  @ApiBearerAuth()
  async deleteuserById(@Param() param) {
    const { id } = param;
    try {
      const user = await this.userService.deleteUser(id);
      return user;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get("/:id")
  @ApiResponse({
    status: HttpStatus.OK,
    type: userDto,
  })
  async fetchuserById(@Param() param: any) {
    const { id } = param;
    try {
      const user = await this.userService.findUserById(id);
      return user;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
