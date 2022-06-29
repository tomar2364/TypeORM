import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class job {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column()
  jobname: string;
}
