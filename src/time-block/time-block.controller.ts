import {
   Body,
   Controller,
   Delete,
   Get,
   HttpCode,
   Param,
   Post,
   Put,
   UseGuards,
   UsePipes,
   ValidationPipe,
} from '@nestjs/common';

import { CurrentUser } from 'src/decorators/user.decorator';
import { TimeBlockDto } from 'src/dto/time-block.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { TimeBlockService } from 'src/time-block/time-block.service';

@UseGuards(JwtAuthGuard)
@Controller('user/time-blocks')
export class TimeBlockController {
   constructor(private readonly timeBlockService: TimeBlockService) {}

   @Get()
   getAll(@CurrentUser('id') userId: string) {
      return this.timeBlockService.getAll(userId);
   }

   @HttpCode(200)
   @UsePipes(new ValidationPipe())
   @Post()
   create(@Body() dto: TimeBlockDto, @CurrentUser('id') userId: string) {
      return this.timeBlockService.create(dto, userId);
   }

   @UsePipes(new ValidationPipe())
   @HttpCode(200)
   @Put('updateOrder')
   updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
      return this.timeBlockService.updateOrder(updateOrderDto.ids);
   }

   @UsePipes(new ValidationPipe())
   @HttpCode(200)
   @Put(':id')
   update(@Body() dto: TimeBlockDto, @CurrentUser('id') userId: string, @Param('id') id: string) {
      return this.timeBlockService.update(dto, id, userId);
   }

   @HttpCode(200)
   @Delete(':id')
   delete(@Param('id') id: string) {
      return this.timeBlockService.delete(id);
   }
}
