import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('c_users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;

  @Column()
  is_admin: boolean;

  @Column()
  can_show_data: boolean;
}
