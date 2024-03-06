import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
// import { User } from './user';

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // @OneToOne(() => User)
  // @JoinColumn()
  // userId: string



  @Column({ nullable: true })
  userId?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  countryOfBirth?: string;

  @Column({ nullable: true })
  nationality?: string;

  constructor(userId: string, gender?: string, countryOfBirth?: string, nationality?: string) {
    this.userId = userId;
    this.gender = gender;
    this.countryOfBirth = countryOfBirth;
    this.nationality = nationality;
  }
}
