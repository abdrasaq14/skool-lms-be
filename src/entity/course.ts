import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user'; // Update the import path if necessary

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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

  @OneToOne(() => User)
  @JoinColumn()
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
