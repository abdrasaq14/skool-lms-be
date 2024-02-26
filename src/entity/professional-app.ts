import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "./user";

@Entity()
export class ProfessionalApplication {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "applicantId" })
  user!: User;

  @Column({ type: "text" })
  personalStatement!: string;

  @Column({ type: "jsonb", nullable: false })
  addQualification!: {
    institutionName: string;
    areaOfStudy: string;
    yearOfGraduation: Date;
    grade: number;
    qualificationType: string;
    countryOfInstition: string;
  }[];

  @Column({ type: "boolean" })
  academicReference!: boolean;

  @Column({ type: "boolean" })
  employmentDetails!: boolean;

  @Column({ type: "text" })
  fundingInformation!: string;

  @Column({ type: "text" })
  disability!: string;

  @Column({ type: "bytea" })
  passportUpload!: Buffer;

  @Column({ type: "boolean" })
  englishLanguageQualification!: boolean;
}
