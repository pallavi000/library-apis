import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthorEntity } from '../../author/entity/authot.entity';
import { GenraEntity } from '../../genra/entity/genra.entity';
import { borrowEntity } from '../../borrow/entity/borrow.entity';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column()
  publisher: string;

  @Column()
  image: string;

  @Column()
  publishedYear: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => AuthorEntity, (author) => author.books)
  author: AuthorEntity;

  @ManyToOne(() => GenraEntity, (genra) => genra.books)
  genra: GenraEntity;

  @OneToOne(() => borrowEntity, (borrow) => borrow.book)
  @JoinColumn()
  borrow: borrowEntity;
}
