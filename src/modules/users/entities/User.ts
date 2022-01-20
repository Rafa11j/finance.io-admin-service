import { UserTypeEnum } from '@users/enum/user-type';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  occupation: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  token_expiration: Date;

  @Column()
  income: number;

  @Column()
  avatar: string;

  @Column()
  active: boolean;

  @Column({
    type: 'varchar',
  })
  user_type: UserTypeEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
