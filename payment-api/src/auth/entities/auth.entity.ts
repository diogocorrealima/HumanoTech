import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({})
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column({ default: false })
  password: string;
}
