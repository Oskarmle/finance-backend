import { Category } from 'src/categories/entities/category.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  title: string;

  @Column({ type: 'timestamp' })
  datetime: Date;

  @Column()
  paymentMethod: string;

  @ManyToOne(() => Category, (category) => category.entries, {})
  category: Category;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.entry)
  userEntity: UserEntity;
}
