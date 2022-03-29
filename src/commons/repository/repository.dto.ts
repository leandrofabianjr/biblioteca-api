import { IsNotEmpty } from 'class-validator';

export class RepositoryDto {
  @IsNotEmpty()
  ownerUuid: string;
}
