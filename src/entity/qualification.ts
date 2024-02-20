import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Qualification {
  @PrimaryGeneratedColumn('uuid')
  id: string = undefined!;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  institutionName?: string;

  @Column({ nullable: true })
  fieldOfStudy?: string;

  @Column({ nullable: true })
  yearOfGraduation?: number;

  @Column({ nullable: true, name: 'gradeOfCGPA' }) 
  gradeOfCGPA?: number;

  @Column({ nullable: true })
  qualificationType?: string;

  @Column({ nullable: true })
  countryOfInstitution?: string;

  constructor(
    user: User,
    institutionName?: string,
    fieldOfStudy?: string,
    yearOfGraduation?: number,
    gradeOfCGPA?: number,
    qualificationType?: string,
    countryOfInstitution?: string
  ) {
    this.user = user;
    this.institutionName = institutionName;
    this.fieldOfStudy = fieldOfStudy;
    this.yearOfGraduation = yearOfGraduation;
    this.gradeOfCGPA = gradeOfCGPA;
    this.qualificationType = qualificationType;
    this.countryOfInstitution = countryOfInstitution;
  }
}
