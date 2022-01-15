import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('apartment-expenses')
export class ApartmentExpenses {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  electricity_bill: number;

  @Column()
  cleaning_expenses: number;

  @Column()
  reserve_expenses: number;

  @Column()
  water_bill: number;

  @Column()
  gas_bill: number;

  @Column()
  apartment: string;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column()
  total: number;

  @Column()
  payment_status: string;

  @Column()
  total_debt: number;

  @Column()
  condominium_id: string;

  @CreateDateColumn()
  created_at: Date;
}
