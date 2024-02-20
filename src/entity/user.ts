import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from './course';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = undefined!;

  // Registration stage fields
  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true, unique: true }) // Set unique to true for email
  email?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  countryOfPermanentResidence?: string;

  // Application stage fields
  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  countryOfBirth?: string;

  @Column({ nullable: true })
  nationality?: string;

  // Qualification stage fields
  @Column({ nullable: true })
  institutionName?: string;

  @Column({ nullable: true })
  fieldOfStudy?: string;

  @Column({ nullable: true })
  yearOfGraduation?: number;

  @Column({ nullable: true, name: 'gradeOfCGPA' }) // Change name to gradeOfCGPA
  gradeOfCGPA?: number;

  @Column({ nullable: true })
  qualificationType?: string;

  @Column({ nullable: true })
  countryOfInstitution?: string;

  // Association with Course
  @OneToMany(() => Course, course => course.user)
  courses!: Course[];

  constructor(
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    countryOfPermanentResidence?: string,
    gender?: string,
    countryOfBirth?: string,
    nationality?: string,
    institutionName?: string,
    fieldOfStudy?: string,
    yearOfGraduation?: number,
    gradeOfCGPA?: number,
    qualificationType?: string,
    countryOfInstitution?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.countryOfPermanentResidence = countryOfPermanentResidence;
    this.gender = gender;
    this.countryOfBirth = countryOfBirth;
    this.nationality = nationality;
    this.institutionName = institutionName;
    this.fieldOfStudy = fieldOfStudy;
    this.yearOfGraduation = yearOfGraduation;
    this.gradeOfCGPA = gradeOfCGPA;
    this.qualificationType = qualificationType;
    this.countryOfInstitution = countryOfInstitution;
  }
}
