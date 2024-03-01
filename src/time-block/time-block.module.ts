import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { TimeBlockController } from 'src/time-block/time-block.controller';
import { TimeBlockService } from 'src/time-block/time-block.service';

@Module({
   controllers: [TimeBlockController],
   providers: [TimeBlockService, PrismaService],
   exports: [TimeBlockService],
})
export class TimeBlockModule {}
