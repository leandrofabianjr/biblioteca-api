import { RestEntity } from 'src/commons/rest-base-controller/rest-entity';
import { Item } from 'src/items/item.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm';

@Entity()
export class Genre extends RestEntity {
  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.genres)
  owner: User;

  @ManyToMany(() => Item, (item) => item.genres)
  items: Item[];
}
