import { IsNotEmpty } from 'class-validator';
import { RepositoryDto } from 'src/commons/repository/repository.dto';

export class CreateAuthorDto extends RepositoryDto {
  @IsNotEmpty()
  name: string;
}
