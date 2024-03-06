import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';


@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  user!: User;

  // @Column({ nullable: true })
  // userId?: string;
  @Column({ nullable: false })
  courseType: string;

  @Column({ nullable: false })
  studyMode: string;

  @Column({ nullable: false })
  courseSearch: string;

  @Column({ nullable: false })
  entryYear: number;

  @Column({ nullable: false })
  entryMonth: string;



  constructor(
    courseType: string,
    studyMode: string,
    courseSearch: string,
    entryYear: number,
    entryMonth: string,
    userId: string
  ) {
    this.courseType = courseType;
    this.studyMode = studyMode;
    this.courseSearch = courseSearch;
    this.entryYear = entryYear;
    this.entryMonth = entryMonth;
  }
}
