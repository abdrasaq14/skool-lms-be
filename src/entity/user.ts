
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = undefined!;

  // Registration stage fields
  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
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

  @Column({ nullable: true })
  gradeOfCCGP?: number;

  @Column({ nullable: true })
  qualificationType?: string;

  @Column({ nullable: true })
  countryOfInstitution?: string;

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
    gradeOfCCGP?: number,
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
    this.gradeOfCCGP = gradeOfCCGP;
    this.qualificationType = qualificationType;
    this.countryOfInstitution = countryOfInstitution;
  }
}

