import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "./user";
import { Course } from "./course";

@Entity()
export class ProfessionalApplication {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ default: 'pending' }) // Assuming 'pending' is the default status
  status!: string;

  @OneToOne(() => Course, (course) => course.id)
  @JoinColumn({ name: "courseId" })
  course!: Course;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
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
