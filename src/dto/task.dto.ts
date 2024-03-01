import { Priority } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsEnum, IsString } from 'class-validator';

export class TaskDto {
   @IsString()
   name: string;

   @IsBoolean()
   @IsOptional()
   isCompleted?: boolean;

   @IsDate()
   @IsOptional()
   createdAt?: Date;

   @IsEnum(Priority)
   @IsOptional()
   @Transform(({ value }) => ('' + value).toLowerCase())
   priority?: Priority;
}
