import { RestEntity } from 'src/commons/rest-base-controller/rest-entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Publisher extends RestEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.publishers)
  @JoinColumn({ name: 'ownerUuid' })
  owner: User;
}
