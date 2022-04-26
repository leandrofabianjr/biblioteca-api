import { Author } from 'src/authors/author.entity';
import { RestEntity } from 'src/commons/rest-base-controller/rest-entity';
import { Genre } from 'src/genres/genre.entity';
import { Location } from 'src/locations/location.entity';
import { Publisher } from 'src/publishers/publisher.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Item extends RestEntity {
  @Column()
  description: string;

  @Column()
  year: number;

  @ManyToOne(() => User, (user) => user.items)
  owner: User;

  @ManyToOne(() => Location, (location) => location.items, { eager: true })
  location: Location;

  @ManyToMany(() => Author, (author) => author.items, { eager: true })
  @JoinTable({ name: 'item_authors' })
  authors: Author[];

  @ManyToMany(() => Genre, (genre) => genre.items, { eager: true })
  @JoinTable({ name: 'item_genres' })
  genres: Genre[];

  @ManyToMany(() => Publisher, (publisher) => publisher.items, { eager: true })
  @JoinTable({ name: 'item_publishers' })
  publishers: Publisher[];
}
