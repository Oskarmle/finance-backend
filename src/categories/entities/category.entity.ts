import { Entry } from 'src/entries/entities/entry.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @OneToMany(() => Entry, (entry) => entry.category)
  entries: Entry[];

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.categories)
  userEntity: UserEntity;
}
