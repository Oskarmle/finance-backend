import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entry]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule {}
