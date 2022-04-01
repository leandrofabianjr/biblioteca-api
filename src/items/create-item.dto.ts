import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { RepositoryDto } from 'src/commons/repository/repository.dto';

export class CreateItemDto extends RepositoryDto {
  @IsNotEmpty()
  description: string;

  @IsInt()
  year: number;

  @IsUUID('4')
  location: string;

  @IsUUID('4', { each: true })
  authors: string[];

  @IsUUID('4', { each: true })
  genres: string[];

  @IsUUID('4', { each: true })
  publishers: string[];
}
