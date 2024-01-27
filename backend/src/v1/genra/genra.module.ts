import { Module } from '@nestjs/common';
import { GenraController } from './genra.controller';
import { GenraService } from './genra.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenraEntity } from './entity/genra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GenraEntity])],
  controllers: [GenraController],
  providers: [GenraService],
})
export class GenraModule {}
