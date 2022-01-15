import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('expense-report')
export class ExpenseReport {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  water_bill: number;

  @Column()
  electricity_bill: number;

  @Column()
  gas_bill: number;

  @Column()
  cash_reserve_after_bill: number;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column()
  condominium_id: string;

  @CreateDateColumn()
  created_at: Date;
}
