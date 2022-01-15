import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('condominium')
export class CondominiumAddress {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  city: string;

  @Column()
  state?: string;

  @Column()
  cep: string;

  @Column()
  number: string;

  @Column()
  country: string;

  @Column()
  condominium_id: string;

  @CreateDateColumn()
  created_at: Date;
}
