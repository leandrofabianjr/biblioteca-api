import { RepositoryEntity } from 'src/commons/repository/repository-entity';
import { Entity, Column } from 'typeorm';

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
}
