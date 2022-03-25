import { RepositoryEntity } from 'src/commons/repository/repository-entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Location extends RepositoryEntity {
  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.locations)
  owner: User;
}
