import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BookEntity } from "./book.entity";
import { UserEntity } from "../../user/entity/user.entity";

@Entity("reservations")
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  reservationDate: Date;

  @Column()
  expirationDate: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @ManyToOne(() => BookEntity, (book) => book.reservations)
  book: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.reservations)
  user: UserEntity;

  @Column()
  userId: number;

  @Column()
  bookId: number;
}
