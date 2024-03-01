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
import { PomodoroRoundDto, PomodoroSessionDto } from 'src/dto/pomodoro.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { PomodoroService } from 'src/pomodoro/pomodoro.service';

@UseGuards(JwtAuthGuard)
@Controller('user/timer')
export class PomodoroController {
   constructor(private readonly pomodoroService: PomodoroService) {}

   @Get('today')
   getTodaySession(@CurrentUser('id') userId: string) {
      return this.pomodoroService.getTodaySession(userId);
   }

   @HttpCode(200)
   @Post()
   create(@CurrentUser('id') userId: string) {
      return this.pomodoroService.create(userId);
   }

   @UsePipes(new ValidationPipe())
   @HttpCode(200)
   @Put('round/:id')
   updateRound(@Param('id') id: string, @Body() dto: PomodoroRoundDto) {
      return this.pomodoroService.updateRound(dto, id);
   }

   @UsePipes(new ValidationPipe())
   @HttpCode(200)
   @Put(':id')
   update(@Body() dto: PomodoroSessionDto, @CurrentUser('id') userId: string, @Param('id') id: string) {
      return this.pomodoroService.update(dto, id, userId);
   }

   @HttpCode(200)
   @Delete(':id')
   deleteSession(@Param('id') id: string, @CurrentUser('id') userId: string) {
      return this.pomodoroService.deleteSession(id, userId);
   }
}
