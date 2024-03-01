import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from 'src/task/task.module';
import { TimeBlockModule } from 'src/time-block/time-block.module';
import { PomodoroModule } from 'src/pomodoro/pomodoro.module';

@Module({
   imports: [ConfigModule.forRoot(), AuthModule, UserModule, TaskModule, TimeBlockModule, PomodoroModule],
})
export class AppModule {}
