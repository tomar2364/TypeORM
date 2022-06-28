import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column({ default: 'defaultDB' })
  DBName: string;
  @Column({ default: '' })
  userName: string;
}
