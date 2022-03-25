import { IsNotEmpty } from 'class-validator';
import { RepositoryDto } from 'src/commons/repository/repository.dto';

export class CreateLocationDto extends RepositoryDto {
  @IsNotEmpty()
  description: string;
}
