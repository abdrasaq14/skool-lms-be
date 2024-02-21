// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// @Entity()
// export class User {
//   @PrimaryGeneratedColumn('uuid')
//   id!: string;

//   @Column()
//   firstName: string;

//   @Column()
//   lastName: string;

//   @Column()
//   email: string;

//   @Column()
//   phoneNumber: string;

//   @Column()
//   password: string;

//   @Column()
//   countryOfResidence: string;

//   constructor(
//     firstName: string,
//     lastName: string,
//     email: string,
//     phoneNumber: string,
//     password: string,
//     countryOfResidence: string
//   ) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email = email;
//     this.phoneNumber = phoneNumber;
//     this.password = password;
//     this.countryOfResidence = countryOfResidence;
//   }
// }
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Course } from '../entity/course';
import { Application } from '../entity/application';
import { Qualification } from '../entity/qualification';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column()
  countryOfResidence: string;

  // One-to-one relationship with Course
  @OneToOne(() => Course)
  @JoinColumn()
  course: Course;

  // One-to-one relationship with Application
  @OneToOne(() => Application)
  @JoinColumn()
  application: Application;

  // One-to-one relationship with Qualification
  @OneToOne(() => Qualification)
  @JoinColumn()
  qualification: Qualification;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    countryOfResidence: string,
    course: Course,
    application: Application,
    qualification: Qualification
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.countryOfResidence = countryOfResidence;
    this.course = course;
    this.application = application;
    this.qualification = qualification;
  }
}

