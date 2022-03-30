import { Column } from 'typeorm';
import { RepositoryEntity } from '../repository/repository-entity';

export abstract class RestEntity extends RepositoryEntity {
  @Column('string', { nullable: true })
  ownerUuid: string;
}
