import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
    id!: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  constructor(fullname: string, email: string, password: string) {
    this.fullname = fullname;
    this.email = email;
    this.password = password;
  }
}