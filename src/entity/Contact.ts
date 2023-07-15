import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

enum LinkPrecedence {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  linkedId: string;

  @Column()
  linkPrecedence: LinkPrecedence;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
