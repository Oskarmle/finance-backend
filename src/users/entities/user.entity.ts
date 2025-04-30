import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../Role';
import { Category } from 'src/categories/entities/category.entity';
import { Entry } from 'src/entries/entities/entry.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: [Role.User],
  })
  role: Role;

  @OneToMany(() => Category, (category) => category.userEntity)
  categories: Category[];

  @OneToMany(() => Entry, (entry) => entry.userEntity)
  entry: Entry[];
}
