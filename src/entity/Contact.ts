import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum LinkPrecedence {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  linkedId: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: LinkPrecedence,
    default: LinkPrecedence.PRIMARY,
  })
  linkPrecedence: LinkPrecedence;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
