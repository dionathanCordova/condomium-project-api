import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('c_users')
export class Users {
  constructor(user?: Partial<Users>) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.telephone = user.telephone;
    this.apartment = user.apartment;
    this.password = user.password;
    this.permission_id = user.permission_id;
    this.avatar = user.avatar;
    this.condominium_id = user.condominium_id;
    this.is_admin = user.is_admin;
    this.can_show_data = user.can_show_data;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }

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
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: string;
}
