import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { Entry } from './entities/entry.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
  ) {}

  create(createEntryDto: CreateEntryDto) {
    return this.entryRepository.save(createEntryDto);
  }

  findAll() {
    return this.entryRepository.find({ relations: ['category'] });
  }

  findOne(id: number) {
    return this.entryRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  remove(id: number) {
    return this.entryRepository.delete(id);
  }
}
