import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RestBaseController } from 'src/commons/rest-base-controller/rest-base.controller';
import { CreateItemDto } from './create-item.dto';
import { Item } from './item.entity';
import { ItemsService } from './items.service';

@Controller('items')
@UseGuards(JwtAuthGuard)
export class ItemsController extends RestBaseController<Item, CreateItemDto> {
  constructor(itemsService: ItemsService) {
    super(itemsService);
  }
}
