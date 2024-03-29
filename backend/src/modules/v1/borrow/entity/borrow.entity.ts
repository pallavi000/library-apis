import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BookEntity } from "../../book/entity/book.entity";
import { UserEntity } from "../../user/entity/user.entity";
import { IsOptional } from "class-validator";

@Entity("borrows")
export class borrowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  borrowDate: Date;

  @Column()
  dueDate: Date;

  @Column()
  @IsOptional()
  returnDate: Date;

  @Column({ default: false })
  isReturned: boolean;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @ManyToOne(() => BookEntity, (book) => book.borrows)
  book: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.borrows)
  user: UserEntity;

  @Column()
  userId: number;

  @Column()
  bookId: number;
}
