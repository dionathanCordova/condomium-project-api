import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CondConfig {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'double', comment: 'valor mínimo agua' })
  basic_water_rate: number;

  @Column({ type: 'double', comment: 'valor médio agua' })
  average_water_rate: number;

  @Column({ type: 'double', comment: 'valor alto agua' })
  high_water_rate: number;

  @Column({ type: 'double', comment: 'valor limpeza' })
  cleaning_fee: number;

  @Column({ type: 'double', comment: 'valor reserva' })
  reserve_value: number;

  @Column({ type: 'double', comment: 'valor do m3 do gás' })
  m3_gas_value: number;

  @Column({ comment: 'síndico isento de pagamento' })
  liquidator_exempt: boolean;

  @Column()
  payment_plan: string;

  @Column()
  year: number;

  @Column()
  condominium_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  updater_id: string;
}
