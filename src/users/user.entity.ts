import { RepositoryEntity } from 'src/commons/repository/repository-entity';
import { Item } from 'src/items/item.entity';
import { Location } from 'src/locations/location.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class User extends RepositoryEntity {
  @Column()
  google_uid: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  profile_picture_url: string;

  @OneToMany(() => Item, (item) => item.owner)
  items: any;

  @OneToMany(() => Location, (location) => location.owner)
  locations: any;
}
