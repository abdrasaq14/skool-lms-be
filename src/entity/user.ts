import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
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
  courses: any;

  @Column({ nullable: true })
  resetToken: string | null;

  @Column({ nullable: true, type: 'timestamp', default: null }) 
  resetTokenExpires: Date | null;

  constructor(firstName: string, lastName: string, email: string, phoneNumber: string, password: string, countryOfResidence: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.countryOfResidence = countryOfResidence;
    this.resetToken = null;  
   this.resetTokenExpires = null ;
  }
}