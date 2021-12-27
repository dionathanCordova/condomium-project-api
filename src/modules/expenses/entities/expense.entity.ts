import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('expenses')
export class Expenses {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  value: number;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column()
  category_id: string;

  @Column()
  condominium_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
