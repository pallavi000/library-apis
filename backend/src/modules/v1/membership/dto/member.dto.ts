import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { UserEntity } from "../../user/entity/user.entity";

export class memberDto {
  @ApiProperty({
    example: "Regular",
    description: "membership type",
  })
  @IsString()
  @IsOptional()
  memberType?: string;

  @ApiProperty({
    example: "2024-01-01",
    description: "membership start Date",
  })
  @IsString()
  @IsOptional()
  memberSince?: Date;

  @ApiProperty({
    example: false,
    description: "memberships status",
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    example: 1,
    description: "id of user",
  })
  @IsNumber()
  user: number;
}
