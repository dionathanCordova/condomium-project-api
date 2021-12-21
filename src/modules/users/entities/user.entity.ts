import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  apartment: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  permission_id: number;

  @Column()
  avatar: string;

  @Column()
  condominium_id: number;

  @Column()
  is_admin: boolean;

  @Column()
  can_show_data: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
