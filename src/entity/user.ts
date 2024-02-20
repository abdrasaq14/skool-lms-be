import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Signup {
  @PrimaryGeneratedColumn("uuid")
    id!: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: number;

  @Column()
  countryOfPermanentResidence: string;

  constructor(firstName: string, lastName: string, email: string, password: string, phoneNumber: number,  countryOfPermanentResidence: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.countryOfPermanentResidence =  countryOfPermanentResidence;
  }
}