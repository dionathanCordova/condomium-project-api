import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('apartment-expenses')
export class WaterExpenses {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  apartment: string;

  @Column()
  previous_reading: number;

  @Column()
  current_reading: number;

  @Column()
  m3_expenses: number;

  @Column()
  total_value: number;

  @Column()
  add_value: number;

  @Column()
  confirm_expense: boolean;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column()
  condominium_id: string;

  @CreateDateColumn()
  created_at: Date;
}
