import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { borrowEntity } from "../../borrow/entity/borrow.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany(() => borrowEntity, (borrow) => borrow.user)
  borrows: borrowEntity[];
}
