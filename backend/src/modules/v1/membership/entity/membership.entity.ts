import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";

@Entity({ name: "memberships" })
export class MembershipEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "Regular" })
  memberType: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  memberSince: Date;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToOne(() => UserEntity, (user) => user.member, { cascade: true })
  @JoinColumn()
  user: UserEntity;
}
