import { RestEntity } from 'src/commons/rest-base-controller/rest-entity';
import { Item } from 'src/items/item.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Location extends RestEntity {
  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.locations)
  owner: User;

  @OneToMany(() => Item, (item) => item.location)
  items: any;
}
