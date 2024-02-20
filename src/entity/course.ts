import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string = undefined!;

  @Column({ nullable: false })
  courseType: string;

  @Column({ nullable: false })
  studyMode: string;

  @Column({ nullable: false })
  courseSearch: string;

  @Column({ nullable: false })
  entryYear: number;

  @Column({ nullable: false })
  entryMonth: number;

  @ManyToOne(() => User, user => user.courses) // Many courses can belong to one user
  user: User;

  constructor(
    courseType: string,
    studyMode: string,
    courseSearch: string,
    entryYear: number,
    entryMonth: number,
    user: User
  ) {
    this.courseType = courseType;
    this.studyMode = studyMode;
    this.courseSearch = courseSearch;
    this.entryYear = entryYear;
    this.entryMonth = entryMonth;
    this.user = user;
  }
}
