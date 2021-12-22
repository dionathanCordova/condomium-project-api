import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('apartments')
export class Apartments {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  apartment: string;

  @Column()
  condominium_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
