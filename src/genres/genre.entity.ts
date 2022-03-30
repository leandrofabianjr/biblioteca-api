import { RestEntity } from 'src/commons/rest-base-controller/rest-entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Genre extends RestEntity {
  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.genres)
  owner: User;
}
