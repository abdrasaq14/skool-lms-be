import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
    UpdateDateColumn,
    OneToOne,
  } from "typeorm";
  import { User } from "./user";
  import { ProfessionalApplication } from "./professional-app";
  
  @Entity()
  export class Chat {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @ManyToOne(() => User, { eager: true }) // Assuming eager loading is required for sender

    @JoinColumn({ name: "senderId" })
    sender!: User;

    @ManyToOne(() => User, { eager: true }) // Assuming eager loading is required for receiver
    
    @JoinColumn({ name: "receiverId" })
    receiver!: User;

    @Column("text")
    message!: string;

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;
      admin: any;
  
    // @ManyToOne(() => ProfessionalApplication, (professionalApp) => professionalApp.id)
    // @JoinColumn({ name: "professionalApplicationId" })
    // professionalApplication!: ProfessionalApplication;
  
    // @Column({ type: "text", nullable: true })
    // voiceNote?: string;
  
    // @Column({ type: "text", nullable: true })
    // picture?: string;
  
    // @Column()
    // title!: string;
  
    // @Column({ type: "boolean", default: false })
    // status!: boolean;
  
    // @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    // updatedAt!: Date;
  }
  