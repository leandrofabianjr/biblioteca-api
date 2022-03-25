import { IsInt, IsNotEmpty } from 'class-validator';
import { RepositoryDto } from 'src/commons/repository/repository.dto';

export class CreateItemDto extends RepositoryDto {
  @IsNotEmpty()
  description: string;

  @IsInt()
  year: number;

  location: string;
}
