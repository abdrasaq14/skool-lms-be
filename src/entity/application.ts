import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  countryOfBirth?: string;

  @Column({ nullable: true })
  nationality?: string;

  constructor(user: User, gender?: string, countryOfBirth?: string, nationality?: string) {
    this.user = user;
    this.gender = gender;
    this.countryOfBirth = countryOfBirth;
    this.nationality = nationality;
  }
}
