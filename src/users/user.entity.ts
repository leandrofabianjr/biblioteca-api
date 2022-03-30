import { Author } from 'src/authors/author.entity';
import { RepositoryEntity } from 'src/commons/repository/repository-entity';
import { Genre } from 'src/genres/genre.entity';
import { Item } from 'src/items/item.entity';
import { Location } from 'src/locations/location.entity';
import { Publisher } from 'src/publishers/publisher.entity';
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

  @OneToMany(() => Publisher, (publisher) => publisher.owner)
  publishers: any;

  @OneToMany(() => Genre, (genre) => genre.owner)
  genres: any;

  @OneToMany(() => Author, (author) => author.owner)
  authors: any;
}
