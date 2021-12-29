import { Category } from '@categories/entities/Category';
import { PaymentMethod } from '@payment-method/entities/payment-method';
import { User } from '@users/entities/User';
import { Account } from 'src/modules/accounts/entities/Account';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FormPaymentType } from '../types/formPaymentType';
import { TransactionType } from '../types/transactionType';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  value: number;

  @Column({
    type: 'varchar',
  })
  type: TransactionType;

  @Column({
    type: 'varchar',
  })
  form_payment: FormPaymentType;

  @Column()
  account_id: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column()
  date: Date;

  @Column()
  payment_method_id: string;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: 'payment_method_id' })
  payment_method: PaymentMethod;

  @Column()
  number_installments: number;

  @Column()
  description: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
