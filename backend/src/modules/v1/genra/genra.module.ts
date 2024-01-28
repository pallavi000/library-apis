import { Module } from "@nestjs/common";
import { GenraController } from "./genra.controller";
import { GenraService } from "./genra.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GenraEntity } from "./entity/genra.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([GenraEntity])],
  controllers: [GenraController],
  providers: [GenraService, JwtService],
})
export class GenraModule {}
