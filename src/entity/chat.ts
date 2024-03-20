import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToOne,
    ManyToOne,
  } from "typeorm";
  import { User } from "./user";
  import { ProfessionalApplication } from "./professional-app";
  
  @Entity()
  export class Chat {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "userId" })
    user!: User;
  
    @ManyToOne(() => ProfessionalApplication, (professionalApp) => professionalApp.id)
    @JoinColumn({ name: "professionalApplicationId" })
    professionalApplication!: ProfessionalApplication;
  
    @Column({ type: "text", nullable: true })
    voiceNote?: string;
  
    @Column({ type: "text", nullable: true })
    picture?: string;
  
    @Column()
    title!: string;
  
    @Column("text")
    message!: string;
  
    @Column({ type: "boolean", default: false })
    status!: boolean;
  
    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
  }
  