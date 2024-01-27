import { AuthorEntity } from 'src/v1/author/entity/authot.entity';
import { borrowEntity } from 'src/v1/borrow/entity/borrow.entity';
import { GenraEntity } from 'src/v1/genra/entity/genra.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
