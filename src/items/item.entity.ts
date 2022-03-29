import { RestEntity } from 'src/commons/rest-base-controller/rest-entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Item extends RestEntity {
  @Column()
  description: string;

  @Column()
  year: number;

  @Column()
  location: string;

  @ManyToOne(() => User, (user) => user.items)
  owner: User;
}
