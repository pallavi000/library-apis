import { BookEntity } from 'src/v1/book/entity/book.entity';
import { UserEntity } from 'src/v1/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('borrows')
export class borrowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  borrowDate: Date;

  @Column()
  returnDate: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(() => BookEntity, (book) => book.borrow)
  @JoinColumn()
  book: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.borrows)
  user: UserEntity;
}
