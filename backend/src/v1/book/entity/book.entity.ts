import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column()
  author: number;

  @Column()
  genra: number;

  @Column()
  publisher: string;

  @Column()
  publishedYear: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
