import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class job {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  jobname: string;
}
