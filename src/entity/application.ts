import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import { User } from './user';

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  user!: User;



  // @Column({ nullable: true })
  // userId?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  countryOfBirth?: string;

  @Column({ nullable: true })
  nationality?: string;

  constructor(
    gender: string,
    countryOfBirth: string,
    nationality: string,
    userId: string
  ) {
    this.gender = gender;
    this.countryOfBirth = countryOfBirth;
    this.nationality = nationality;
  }

}
