import { RepositoryEntity } from 'src/commons/repository/repository-entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Publisher extends RepositoryEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.publishers)
  owner: User;
}
