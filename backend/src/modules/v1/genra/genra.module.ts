import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

//controller
import { GenraController } from './genra.controller';

//service
import { GenraService } from './genra.service';

//entity
import { GenraEntity } from './entity/genra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GenraEntity])],
  controllers: [GenraController],
  providers: [GenraService, JwtService],
})
export class GenraModule {}
