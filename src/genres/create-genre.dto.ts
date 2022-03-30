import { IsNotEmpty } from 'class-validator';
import { RepositoryDto } from 'src/commons/repository/repository.dto';

export class CreateGenreDto extends RepositoryDto {
  @IsNotEmpty()
  description: string;
}
