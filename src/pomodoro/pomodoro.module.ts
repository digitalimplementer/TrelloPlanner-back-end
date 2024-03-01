import { Module } from '@nestjs/common';
import { PomodoroController } from 'src/pomodoro/pomodoro.controller';
import { PomodoroService } from 'src/pomodoro/pomodoro.service';

import { PrismaService } from 'src/prisma.service';

@Module({
   controllers: [PomodoroController],
   providers: [PomodoroService, PrismaService],
   exports: [PomodoroService],
})
export class PomodoroModule {}
