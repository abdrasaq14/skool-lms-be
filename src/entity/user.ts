import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn("uuid")
    id!: string;

  @Column()
  firstName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  countryOfResidence: string;

  constructor(firstName: string, email: string, password: string, countryOfResidence: string) {
    this.firstName = firstName;
    this.email = email;
    this.password = password;
    this.countryOfResidence = countryOfResidence;
  }
}