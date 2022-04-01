import { Author } from 'src/authors/author.entity';
import { RestEntity } from 'src/commons/rest-base-controller/rest-entity';
import { Genre } from 'src/genres/genre.entity';
import { Location } from 'src/locations/location.entity';
import { Publisher } from 'src/publishers/publisher.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  RelationId,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Item extends RestEntity {
  @Column()
  description: string;

  @Column()
  year: number;

  @ManyToOne(() => User, (user) => user.items)
  owner: User;

  @Column()
  locationUuid: string;

  @ManyToOne(() => Location, (location) => location.items, { eager: true })
  @JoinColumn({ name: 'userId' })
  location: Location;

  @RelationId((item: Item) => item.authors)
  authorsUuids: string[];

  @ManyToMany(() => Author, (author) => author.items, { eager: true })
  @JoinTable({ name: 'item_authors' })
  authors: Author[];

  @RelationId((item: Item) => item.genres)
  genresUuids: string[];

  @ManyToMany(() => Genre, (genre) => genre.items, { eager: true })
  @JoinTable({ name: 'item_genres' })
  genres: Genre[];

  @RelationId((item: Item) => item.publishers)
  publishersUuids: string[];

  @ManyToMany(() => Publisher, (publisher) => publisher.items, { eager: true })
  @JoinTable({ name: 'item_publishers' })
  publishers: Publisher[];
}
