import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Condominium {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  config_id: string;

  @Column()
  count_apartments: number;

  @CreateDateColumn()
  created_at: Date;
}
