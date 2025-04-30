import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { Entry } from './entities/entry.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,

    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async create(createEntryDto: CreateEntryDto) {
    const { userEntityId, ...entryData } = createEntryDto;

    const user = await this.userEntityRepository.findOne({
      where: { id: userEntityId },
    });

    const newEntry = this.entryRepository.create({
      ...entryData,
      userEntity: user,
    });

    return this.entryRepository.save(newEntry);
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
