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
import { TaskDto } from 'src/dto/task.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { TaskService } from 'src/task/task.service';

@UseGuards(JwtAuthGuard)
@Controller('user/tasks')
export class TaskController {
   constructor(private readonly taskService: TaskService) {}

   @Get()
   getAll(@CurrentUser('id') userId: string) {
      return this.taskService.getAll(userId);
   }

   @HttpCode(200)
   @Post()
   create(@Body() dto: TaskDto, @CurrentUser('id') userId: string) {
      return this.taskService.create(dto, userId);
   }

   @UsePipes(new ValidationPipe())
   @HttpCode(200)
   @Put(':id')
   update(@Body() dto: TaskDto, @CurrentUser('id') userId: string, @Param('id') id: string) {
      return this.taskService.update(dto, id, userId);
   }

   @HttpCode(200)
   @Delete(':id')
   delete(@Param('id') id: string) {
      return this.taskService.delete(id);
   }
}
